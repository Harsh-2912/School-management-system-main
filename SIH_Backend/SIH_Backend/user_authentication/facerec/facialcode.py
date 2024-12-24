import os
import csv
import datetime
import tkinter as tk
from tkinter import messagebox, simpledialog
import cv2
import dlib
import face_recognition
from PIL import Image

# Ensure necessary folders are present
def create_folder_structure():
    os.makedirs("./FR/Images", exist_ok=True)  # For employee images
    os.makedirs("./FR/Attendance", exist_ok=True)  # For attendance CSV files

# Initialize Dlib's face detector and landmark predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(r"C:\Users\gupta\OneDrive\Desktop\SIH\SIH backend\user_authentication\facerec\shape_predictor_68_face_landmarks.dat")

# Function to add a new employee
def add_employee_btn():
    def add_employee():
        cap = cv2.VideoCapture(0)
        messagebox.showinfo("Instructions", "To stop, press 'q' on your keyboard. To capture the image, press 'c'.")

        cv2.namedWindow("Employee Preview")

        while True:
            ret, frame = cap.read()
            if not ret:
                print("Error: Unable to capture frame")
                break

            cv2.imshow("Employee Preview", frame)
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break
            elif key == ord('c'):
                name = simpledialog.askstring("Name", "Enter employee name:")
                if name:
                    image_name = f"{name}.jpg"
                    image_path = os.path.join("./FR/Images", image_name)
                    cv2.imwrite(image_path, frame)
                    print("Image saved as:", image_path)
                    messagebox.showinfo("Success", f"Employee {name} added successfully!")
                break

        cap.release()
        cv2.destroyWindow("Employee Preview")

    add_employee()

# Function to write attendance to CSV
def write_to_csv(file_path, data):
    # Ensure the directory exists
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    # Check if the file exists
    file_exists = os.path.isfile(file_path)

    with open(file_path, mode='a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=data.keys())
        if not file_exists:
            writer.writeheader()  # Write header if file doesn't exist
        writer.writerow(data)

# Function to mark attendance and automatically update CSV after recognizing the face
def mark_attendance():
    try:
        video_capture = cv2.VideoCapture(0)  # Try to access the camera
        if not video_capture.isOpened():
            raise Exception("Error: Unable to access the camera.")
    except Exception as e:
        messagebox.showerror("Camera Error", str(e))
        return
    
    folder_path = "./FR/Images"
    known_face_encodings = []
    known_face_names = []

    # Load known employee images
    for filename in os.listdir(folder_path):
        if filename.endswith('.jpg'):
            try:
                image = face_recognition.load_image_file(os.path.join(folder_path, filename))
                face_encoding = face_recognition.face_encodings(image)[0]
                name = os.path.splitext(filename)[0]  # Extract name from the image filename
                known_face_encodings.append(face_encoding)
                known_face_names.append(name)
                print("Encoded:", name)
            except IndexError:
                print(f"Warning: No face found in {filename}. Skipping this image.")

    # Create new CSV file path based on today's date
    today_date = datetime.datetime.now().strftime("%Y-%m-%d")  # Get today's date
    csv_file_path = f"./FR/Attendance/attendance_{today_date}.csv"  # Daily file creation

    # Check if CSV file for the current day exists, and create it if not
    if not os.path.exists(csv_file_path):
        with open(csv_file_path, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["Time", "Name"])  # Write header row for the new CSV

    recognized_names = set()  # To track who has been marked already

    while True:
        ret, frame = video_capture.read()
        if not ret:
            break

        # Rescale frame for faster processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.5, fy=0.5)

        face_locations = face_recognition.face_locations(small_frame)
        face_encodings = face_recognition.face_encodings(small_frame, face_locations)

        for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding, tolerance=0.5)
            name = "Not recognized"

            if True in matches:
                first_match_index = matches.index(True)
                name = known_face_names[first_match_index]

            # If the name is recognized and not marked already, update CSV immediately
            if name != "Not recognized" and name not in recognized_names:
                recognized_names.add(name)  # Mark as recognized

                # Display "Attendance Marked" on the video feed in blue color
                cv2.rectangle(frame, (left*2, top*2), (right*2, bottom*2), (255, 0, 0), 2)  # Blue color box
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, "Attendance Marked", (left*2 + 6, bottom*2 - 6), font, 0.5, (255, 0, 0), 1)  # Blue color text

                # Update the CSV with the recognized employee's attendance
                current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                data = {'Time': current_time, 'Name': name}
                write_to_csv(csv_file_path, data)  # Write attendance to today's CSV file

                print(f"Attendance marked for {name} at {current_time}")
            else:
                # Display "Attendance Marked" on the video feed in blue color after recognition
                if name in recognized_names:
                    cv2.rectangle(frame, (left*2, top*2), (right*2, bottom*2), (255, 0, 0), 2)  # Blue color box
                    cv2.putText(frame, "Attendance Marked", (left*2 + 6, bottom*2 - 6), font, 0.5, (255, 0, 0), 1)  # Blue color text
                else:
                    # Display "Not recognized" on the video feed in red color
                    cv2.rectangle(frame, (left*2, top*2), (right*2, bottom*2), (0, 0, 255), 2)  # Red color box
                    font = cv2.FONT_HERSHEY_DUPLEX
                    cv2.putText(frame, "Not recognized", (left*2 + 6, bottom*2 - 6), font, 0.5, (255, 255, 255), 1)  # Red color text

        # Display the frame
        cv2.imshow('Mark Attendance', frame)

        # Exit on pressing 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    video_capture.release()
    cv2.destroyAllWindows()

# Function to check attendance or create the file if it doesn't exist
def check_attendance():
    today_date = datetime.datetime.now().strftime("%Y-%m-%d")  # Get today's date
    file_path = os.path.join("./FR/Attendance", f"attendance_{today_date}.csv")  # Correct path for today's CSV file

    print(f"Attempting to access: {file_path}")  # Debug statement

    # Check if the file exists
    if not os.path.exists(file_path):
        # Create a new CSV file and write the header if it doesn't exist
        with open(file_path, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["Time", "Name"])  # Write header row
        messagebox.showinfo("Info", f"Attendance file created: {file_path}")
    else:
        try:
            # Open the existing file
            os.startfile(file_path)
        except Exception as e:
            messagebox.showerror("Error", f"Failed to open CSV file: {str(e)}")

# Function to delete an employee
def delete_employee_btn():
    def delete_employee():
        name = simpledialog.askstring("Name", "Enter the employee name to delete:")
        if name:
            image_path = os.path.join("./FR/Images", f"{name}.jpg")
            if os.path.exists(image_path):
                os.remove(image_path)
                messagebox.showinfo("Success", f"Employee {name} deleted successfully!")
            else:
                messagebox.showwarning("Error", f"No employee found with the name {name}.")

    delete_employee()

# Function to exit the program
def exit_program():
    root.quit()

# Function to display help information
def show_help_box():
    messagebox.showinfo("Help", """
Add Employee -> Add a new Employee in your Database
Mark Attendance -> Mark attendance of existing Employees
Check Attendance -> Check the attendance of all employees
Exit -> Exit the Attendance System
""")

# Create the Tkinter window
root = tk.Tk()
root.title("Attendance System by Team Eagle")

button_style = {
    "bg": "#4CAF50",
    "width": 20,
    "height": 2,
    "font": ("Arial", 10)
}


# Add buttons
add_button = tk.Button(root, text="Add Employee", command=add_employee_btn)
add_button.pack(pady=10)

delete_button = tk.Button(root, text="Delete Employee", command=delete_employee_btn)
delete_button.pack(pady=10)

mark_attendance_button = tk.Button(root, text="Mark Attendance", command=mark_attendance)
mark_attendance_button.pack(pady=10)

check_attendance_button = tk.Button(root, text="Check Attendance", command=check_attendance)
check_attendance_button.pack(pady=10)

exit_button = tk.Button(root, text="Exit", command=exit_program)
exit_button.pack(pady=10)

help_button = tk.Button(root, text="Help", command=show_help_box)
help_button.pack(pady=10)

# Run the Tkinter event loop
root.mainloop()
