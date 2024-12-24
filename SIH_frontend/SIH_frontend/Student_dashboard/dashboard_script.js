document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.sidebar a');
    const sections = document.querySelectorAll('.section');

    function hideAllSections() {
        sections.forEach(section => section.style.display = 'none');
    }

    function showSection(sectionId) {
        hideAllSections();
        document.querySelector(`#${sectionId}`).style.display = 'block';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSectionId = this.getAttribute('href').substring(1);
            if (targetSectionId === 'logout-btn') {
                window.location.href = 'index.html';
            } else {
                showSection(targetSectionId);
            }
        });
    });

    if (sections.length > 0) {
        showSection(sections[0].id);
    }
});

document.getElementById('logout-btn').addEventListener('click', function() {
    // Perform any cleanup or logout operations (if necessary)
    
    // Redirect to the login page (index.html)
    window.location.href = '../index.html';
});


// Sample assignments uploaded by the teacher (this would be dynamic in a real system)
const assignments = [
    { title: 'Math Assignment', fileUrl: 'math-assignment.pdf' },
    { title: 'Science Assignment', fileUrl: 'science-assignment.pdf' },
    // Add more assignments as needed
];

// Function to render the uploaded assignments from the teacher
function renderAssignments() {
    const assignmentList = document.getElementById('assignment-list');
    assignmentList.innerHTML = ''; // Clear the list before rendering

    assignments.forEach(assignment => {
        const assignmentItem = document.createElement('div');
        assignmentItem.classList.add('assignment-item');
        
        assignmentItem.innerHTML = `
            <p>${assignment.title}</p>
            <a href="${assignment.fileUrl}" target="_blank">Download</a>
        `;
        
        assignmentList.appendChild(assignmentItem);
    });
}

// Event listener for handling student assignment upload
document.getElementById('student-upload-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get the uploaded file
    const studentFile = document.getElementById('student-file').files[0];
    
    if (studentFile && studentFile.type === 'application/pdf') {
        alert('Your assignment has been uploaded successfully!');
        
        // In a real scenario, you'd upload the file to the server here
        // After successful upload, notify the teacher or update their dashboard
        
        // Reset the form
        this.reset();
    } else {
        alert('Please upload a valid PDF file.');
    }
});

// Call the renderAssignments function on page load to display available assignments
renderAssignments();


// Leave Application section

document.addEventListener('DOMContentLoaded', () => {
    const leaveForm = document.getElementById('leave-form');
    const leaveMessage = document.getElementById('leave-message');

    leaveForm.addEventListener('submit', (event) => {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Get form values
        const leaveType = document.getElementById('leave-type').value;
        const startDate = new Date(document.getElementById('start-date').value);
        const endDate = new Date(document.getElementById('end-date').value);
        const reason = document.getElementById('reason').value;

        // Validate form fields
        if (!leaveType || !startDate || !endDate || !reason) {
            leaveMessage.textContent = 'Please fill out all fields.';
            leaveMessage.style.display = 'block';
            leaveForm.style.display = 'none';
            return;
        }

        if (endDate < startDate) {
            leaveMessage.textContent = 'End date cannot be before start date.';
            leaveMessage.style.display = 'block';
            leaveForm.style.display = 'none';
            return;
        }

        // If all validations pass, show a confirmation message
        leaveMessage.textContent = 'Leave application submitted successfully!';
        leaveMessage.style.display = 'block';
        leaveForm.style.display = 'none';
        
        // Optionally, you can reset the form or send the data to a server here
        leaveForm.reset();
       
    });
});

// notifications
document.addEventListener('DOMContentLoaded', () => {
    const notificationsList = document.querySelector('.notifications-container');
    const filterSelect = document.getElementById('notification-filter');

    // Example notifications data
    const notifications = [
        { id: 1, category: 'assignment', title: 'New Assignment Posted', description: 'A new assignment has been posted in your Mathematics class. Please check the class portal for details.', time: '2 hours ago' },
        { id: 2, category: 'exam', title: 'Upcoming Exam', description: 'Your Science exam is scheduled for next week. Make sure to prepare accordingly.', time: '1 day ago' },
        { id: 3, category: 'event', title: 'School Event', description: 'There will be a school event this Friday. All students are encouraged to attend.', time: '3 days ago' },
        { id: 4, category: 'feedback', title: 'Feedback Requested', description: 'Your feedback is requested on the recent school survey. Please fill out the form by the end of the week.', time: '5 days ago' },
        { id: 5, category: 'attendance', title: 'Attendance Reminder', description: 'Your attendance has been below the required percentage. Please ensure regular attendance.', time: '1 week ago' },
        { id: 6, category: 'maintenance', title: 'System Maintenance', description: 'The school portal will be undergoing maintenance this weekend. Access will be unavailable during this period.', time: '2 weeks ago' },
        { id: 7, category: 'library', title: 'Library Books Due', description: 'Your library books are due for return. Please return them by the end of the week to avoid fines.', time: '3 weeks ago' },
        { id: 8, category: 'notice', title: 'Important Notice', description: 'An important notice has been posted on the school board. Please check it as soon as possible.', time: '1 month ago' }
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
            case 'exam': return 'calendar-day'; // Exams
            case 'event': return 'calendar-check'; // Events
            case 'feedback': return 'pen'; // Feedback
            case 'attendance': return 'user-check'; // Attendance
            case 'maintenance': return 'tools'; // Maintenance
            case 'library': return 'book'; // Library
            case 'notice': return 'exclamation-triangle'; // Notices
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


//study material section

// Sample study materials uploaded by teachers (this would be dynamic in a real system)
const studyMaterials = [
    { subject: 'Mathematics', fileUrl: 'math-material.pdf', date: '2024-08-20' },
    { subject: 'Science', fileUrl: 'science-material.pdf', date: '2024-08-22' },
    { subject: 'English', fileUrl: 'english-material.pdf', date: '2024-08-20' },
    { subject: 'Hindi', fileUrl: 'hindi-material.pdf', date: '2024-08-22' },
    // Add more materials as needed
];

// Function to render the study materials list
function renderStudyMaterials() {
    const materialList = document.getElementById('material-list');
    materialList.innerHTML = ''; // Clear the list before rendering

    studyMaterials.forEach(material => {
        const materialItem = document.createElement('div');
        materialItem.classList.add('material-item');

        materialItem.innerHTML = `
            <div class="material-info">
                <p>${material.subject}</p>
                <span>Date: ${material.date}</span>
            </div>
            <a href="${material.fileUrl}" target="_blank">Download</a>
        `;

        materialList.appendChild(materialItem);
    });
}

// Call the renderStudyMaterials function on page load to display available materials
renderStudyMaterials();
