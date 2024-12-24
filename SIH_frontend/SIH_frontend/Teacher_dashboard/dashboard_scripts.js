document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    // Show the profile section by default
    showSection('profile');
});

document.addEventListener('DOMContentLoaded', function () {
    const viewToggles = document.querySelectorAll('.view-toggle');
    const weeklyView = document.getElementById('weekly-view');
    const monthlyView = document.getElementById('monthly-view');

    viewToggles.forEach(button => {
        button.addEventListener('click', function () {
            const view = this.getAttribute('data-view');

            if (view === 'weekly') {
                weeklyView.classList.add('active');
                monthlyView.classList.remove('active');
            } else if (view === 'monthly') {
                monthlyView.classList.add('active');
                weeklyView.classList.remove('active');
            }
        });
    });

    // Show the weekly view by default
    weeklyView.classList.add('active');
});


document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.querySelector('.prev-month');
    const nextButton = document.querySelector('.next-month');
    const monthYearDisplay = document.querySelector('.month-year');
    const calendarDayGrid = document.getElementById('calendar-days');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function renderCalendar(month, year) {
        const firstDay = new Date(year, month, 1).getDay(); // Day of the week the month starts on
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month
        
        calendarDayGrid.innerHTML = ''; // Clear existing days

        // Adding empty days for the start of the month
        for (let i = 0; i < firstDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            calendarDayGrid.appendChild(dayElement);
        }

        // Adding days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;

            // Example events
            if (day === 5 || day === 15 || day === 25) {
                const eventSpan = document.createElement('span');
                eventSpan.classList.add('calendar-day-events');
                eventSpan.textContent = 'Event happening'; // Replace with actual event data
                dayElement.appendChild(eventSpan);
            }

            calendarDayGrid.appendChild(dayElement);
        }

        // Adding empty days for the end of the month (to complete the grid)
        const totalDays = firstDay + daysInMonth;
        const daysInNextMonth = (7 - (totalDays % 7)) % 7;
        for (let i = 0; i < daysInNextMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            calendarDayGrid.appendChild(dayElement);
        }

        monthYearDisplay.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;
    }

    prevButton.addEventListener('click', function () {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextButton.addEventListener('click', function () {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    // Initial render
    renderCalendar(currentMonth, currentYear);
});

//Attendance section
document.addEventListener('DOMContentLoaded', function () {
    const selectClass = document.getElementById('select-class');
    const selectSection = document.getElementById('select-section');
    const applyButton = document.getElementById('apply-filters');
    const cameraSection = document.getElementById('camera-section');
    const cameraFeed = document.getElementById('camera-feed');
    const captureButton = document.getElementById('capture-button');
    const attendanceDate = document.getElementById('attendance-date');
    const submitButton = document.getElementById('submit-attendance');

    // Function to initialize and display camera feed
    function startCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                cameraFeed.srcObject = stream;
                cameraFeed.play();
                cameraSection.style.display = 'block';
            })
            .catch(function (error) {
                console.error("Error accessing camera: ", error);
                alert("Unable to access the camera. Please check your permissions and try again.");
            });
    }

    // Event listener for "Apply" button
    applyButton.addEventListener('click', function () {
        if (selectClass.value && selectSection.value) {
            startCamera();  // Start the camera feed
        } else {
            alert('Please select both class and section.');
        }
    });

    // Event listener for "Capture" button
    captureButton.addEventListener('click', function () {
        // Capture image from the camera feed
        let canvas = document.createElement('canvas');
        canvas.width = cameraFeed.videoWidth;
        canvas.height = cameraFeed.videoHeight;
        let context = canvas.getContext('2d');
        context.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);
        let imageData = canvas.toDataURL('image/png');

        console.log("Captured Image Data:", imageData);
        // Here you can send the imageData to your server for face recognition

        alert('Image captured successfully!');
    });

    // Event listener for "Submit Attendance" button
    submitButton.addEventListener('click', function () {
        if (attendanceDate.value) {
            // Here you can handle the submission of the attendance data
            // including the captured image and selected date
            console.log("Date: " + attendanceDate.value);
            // Implement logic to save the attendance data

            alert('Attendance submitted successfully!');
        } else {
            alert('Please select a date.');
        }
    });

    // Initial setup
    cameraSection.style.display = 'none';  // Hide camera section initially
});



// Grades and assessments
document.addEventListener('DOMContentLoaded', function () {
    const students = [
        { id: 1, name: 'John Doe', class: 'class-1', section: 'A' },
        { id: 2, name: 'Jane Smith', class: 'class-2', section: 'B' },
        { id: 3, name: 'Mark Lee', class: 'class-1', section: 'C' },
        { id: 4, name: 'Emily Davis', class: 'class-1', section: 'A' },
        { id: 5, name: 'Michael Brown', class: 'class-2', section: 'B' }
    ];

    const gradesTableBody = document.getElementById('grades-table-body');

    // Function to filter and display students based on selected class, section, subject, and assessment type
    function filterAndDisplayStudents() {
        const selectedClass = document.getElementById('select-grade-class').value;
        const selectedSection = document.getElementById('select-grade-section').value;
        const selectedSubject = document.getElementById('select-subject').value;
        const selectedAssessment = document.getElementById('select-assessment').value;

        const filteredStudents = students.filter(student => 
            student.class === selectedClass && student.section === selectedSection);

        renderGradesTable(filteredStudents, selectedSubject, selectedAssessment);

        document.getElementById('grade-tools').style.display = filteredStudents.length > 0 ? 'block' : 'none';
        document.getElementById('grades-table').style.display = filteredStudents.length > 0 ? 'table' : 'none';
    }

    // Function to render grades table based on filtered students, subject, and assessment
    function renderGradesTable(filteredStudents, subject, assessment) {
        gradesTableBody.innerHTML = ''; // Clear previous data

        // Only render rows if subject and assessment are selected
        if (subject && assessment) {
            filteredStudents.forEach(student => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td><input type="text" class="grade-input" data-student-id="${student.id}" data-subject="${subject}" data-assessment="${assessment}" placeholder="Enter Grade"></td>
                `;

                gradesTableBody.appendChild(row);
            });
        }
    }

    // Event listener for "Apply" button
    document.getElementById('apply-grade-filters').addEventListener('click', filterAndDisplayStudents);

    // Event listener for "Submit Grades" button
    document.getElementById('submit-grades').addEventListener('click', function () {
        const gradeInputs = document.querySelectorAll('.grade-input');
        let gradesData = [];

        gradeInputs.forEach(input => {
            const studentId = input.getAttribute('data-student-id');
            const subject = input.getAttribute('data-subject');
            const assessment = input.getAttribute('data-assessment');
            const grade = input.value;

            if (grade) {
                gradesData.push({
                    studentId,
                    subject,
                    assessment,
                    grade
                });
            }
        });

        if (gradesData.length > 0) {
            console.log('Grades Data:', gradesData);
            alert('Grades submitted successfully!');
        } else {
            alert('No grades entered!');
        }
    });

    // Event listener for "Search" functionality
    document.getElementById('search-grade-student').addEventListener('input', function () {
        const searchValue = this.value.toLowerCase();

        Array.from(gradesTableBody.children).forEach(row => {
            const studentName = row.children[1].textContent.toLowerCase();
            if (studentName.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});


// Leave requests

document.addEventListener('DOMContentLoaded', () => {
    const leaveRequestForm = document.getElementById('leave-request');
    const requestsTableBody = document.getElementById('requests-table-body');
    
    // Example data for demonstration purposes
    const leaveRequests = [
        { id: 1, date: '2024-08-21', type: 'Sick Leave', reason: 'Flu', status: 'Pending' },
        { id: 2, date: '2024-08-22', type: 'Vacation', reason: 'Family Trip', status: 'Approved' }
        // Add more sample data or fetch from a server
    ];

    // Function to render leave requests table
    function renderLeaveRequests() {
        requestsTableBody.innerHTML = '';
        leaveRequests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.id}</td>
                <td>${request.date}</td>
                <td>${request.type}</td>
                <td>${request.reason}</td>
                <td>${request.status}</td>
            `;
            requestsTableBody.appendChild(row);
        });
    }

    // Function to handle form submission
    leaveRequestForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = new FormData(leaveRequestForm);
        const newRequest = {
            id: leaveRequests.length + 1,
            date: formData.get('date'),
            type: formData.get('leave-type'),
            reason: formData.get('reason'),
            status: 'Pending'
        };
        
        leaveRequests.push(newRequest);
        renderLeaveRequests();
        leaveRequestForm.reset();
    });

    // Initial render
    renderLeaveRequests();
});

 // Notification
 document.addEventListener('DOMContentLoaded', () => {
    const notificationsList = document.querySelector('.notifications-container');
    const filterSelect = document.getElementById('notification-filter');

    // Example notifications data
    const notifications = [
        { id: 1, category: 'update', title: 'New Curriculum Update', description: 'A new update to the curriculum has been posted. Please review the changes in the teacher\'s portal.', time: '2 hours ago' },
        { id: 2, category: 'meeting', title: 'Parent-Teacher Meeting Scheduled', description: 'A parent-teacher meeting is scheduled for next week. Make sure to prepare your reports.', time: '1 day ago' },
        { id: 3, category: 'event', title: 'School Event Participation', description: 'A school event is being organized. Teachers are encouraged to participate or help organize.', time: '3 days ago' },
        { id: 4, category: 'deadline', title: 'Grade Submission Deadline', description: 'The deadline for submitting grades is approaching. Please ensure all grades are entered by the end of the week.', time: '5 days ago' },
        { id: 5, category: 'review', title: 'Attendance Review', description: 'Review the attendance records for your classes to ensure accuracy.', time: '1 week ago' },
        { id: 6, category: 'maintenance', title: 'System Maintenance', description: 'The school management system will undergo maintenance this weekend. Access will be limited during this period.', time: '2 weeks ago' },
        { id: 7, category: 'resource', title: 'Resource Requests', description: 'You have pending resource requests. Please review and approve or reject them as necessary.', time: '3 weeks ago' },
        { id: 8, category: 'policy', title: 'Important School Policy Update', description: 'An important update to the school policy has been released. Please review the updated guidelines.', time: '1 month ago' }
        // Add more sample notifications or fetch from a server
    ];

    function renderNotifications(filter = '') {
        notificationsList.innerHTML = '';
        notifications
            .filter(notification => filter === '' || notification.category === filter)
            .forEach(notification => {
                const listItem = document.createElement('div');
                listItem.classList.add('notification');
                listItem.innerHTML = `
                    <div class="notification-icon">
                        <i class="fas fa-${getIcon(notification.category)}"></i>
                    </div>
                    <div class="notification-content">
                        <h3 class="notification-title">${notification.title}</h3>
                        <p class="notification-description">${notification.description}</p>
                        <span class="notification-time">${notification.time}</span>
                    </div>
                `;
                notificationsList.appendChild(listItem);
            });
    }

    function getIcon(category) {
        switch (category) {
            case 'update': return 'book-open'; // Curriculum Updates
            case 'meeting': return 'calendar-day'; // Meetings
            case 'event': return 'calendar-check'; // Events
            case 'deadline': return 'hourglass-end'; // Deadlines
            case 'review': return 'list-check'; // Reviews
            case 'maintenance': return 'tools'; // Maintenance
            case 'resource': return 'tachometer-alt'; // Resources
            case 'policy': return 'exclamation-triangle'; // Policy Updates
            default: return 'bell'; // Default icon
        }
    }

    // Initial render
    renderNotifications();

    // Event listener for filter changes
    filterSelect.addEventListener('change', (e) => {
        renderNotifications(e.target.value);
    });
});


 // messages section
 document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('message-form');
    const messageList = document.getElementById('message-list');

    const messages = [];

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const recipient = document.getElementById('message-recipient').value;
        const subject = document.getElementById('message-subject').value;
        const body = document.getElementById('message-body').value;

        // Create a new message object
        const newMessage = {
            id: messages.length + 1,
            recipient: recipient,
            subject: subject,
            body: body,
            time: new Date().toLocaleString()
        };

        // Add the new message to the messages array
        messages.push(newMessage);

        // Update message list
        renderMessages();
        // Optionally: Clear the form fields
        messageForm.reset();
    });

    function renderMessages() {
        messageList.innerHTML = '';
        messages.forEach(message => {
            const messageItem = document.createElement('div');
            messageItem.classList.add('message');
            messageItem.innerHTML = `
                <div class="message-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="message-content">
                    <h3 class="message-title">${message.subject}</h3>
                    <p class="message-description">${message.body}</p>
                    <span class="message-time">${message.time}</span>
                </div>
            `;
            messageList.appendChild(messageItem);
        });
    }
});

 // resource
 document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const resourcesList = document.getElementById('resources-list');
    const uploadedResources = [];

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('resource-title').value;
        const fileInput = document.getElementById('resource-file');
        const file = fileInput.files[0];

        if (file) {
            const resource = {
                id: uploadedResources.length + 1,
                title: title,
                file: file
            };

            // Add to uploaded resources
            uploadedResources.push(resource);

            // Render resources
            renderResources();
            // Clear the form
            uploadForm.reset();
        }
    });

    function renderResources() {
        resourcesList.innerHTML = '';
        uploadedResources.forEach(resource => {
            const resourceItem = document.createElement('li');
            resourceItem.innerHTML = `
                <span>${resource.title}</span>
                <a href="${URL.createObjectURL(resource.file)}" download="${resource.file.name}">Download</a>
            `;
            resourcesList.appendChild(resourceItem);
        });
    }
});
