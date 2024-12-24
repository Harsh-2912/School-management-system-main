document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove 'active' class from all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Remove 'active' class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Add 'active' class to the clicked link's section
            const targetSectionId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetSectionId);

            if (targetSection) {
                targetSection.classList.add('active');
                link.classList.add('active');
            }
        });
    });
});
document.getElementById('logout-btn').addEventListener('click', function() {
    // Perform any cleanup or logout operations (if necessary)
    
    // Redirect to the login page (index.html)
    window.location.href = '../index.html';
});


//staff management
document.addEventListener('DOMContentLoaded', () => {
    const addStaffBtn = document.getElementById('add-staff-btn');
    const staffModal = document.getElementById('staff-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const staffForm = document.getElementById('staff-form');
    const staffTable = document.getElementById('staff-table').getElementsByTagName('tbody')[0];
    let editingRowIndex = -1;

    addStaffBtn.addEventListener('click', () => {
        staffModal.style.display = 'flex';
        staffForm.reset();
        editingRowIndex = -1;
        document.getElementById('modal-title').textContent = 'Add Staff';
    });

    closeModalBtn.addEventListener('click', () => {
        staffModal.style.display = 'none';
    });

    staffForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const position = document.getElementById('position').value;
        const department = document.getElementById('department').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (editingRowIndex > -1) {
            const row = staffTable.rows[editingRowIndex];
            row.cells[0].textContent = name;
            row.cells[1].textContent = position;
            row.cells[2].textContent = department;
            row.cells[3].textContent = email;
            row.cells[4].textContent = phone;
        } else {
            const newRow = staffTable.insertRow();
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${position}</td>
                <td>${department}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
        }

        staffModal.style.display = 'none';
    });

    staffTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const row = e.target.closest('tr');
            document.getElementById('name').value = row.cells[0].textContent;
            document.getElementById('position').value = row.cells[1].textContent;
            document.getElementById('department').value = row.cells[2].textContent;
            document.getElementById('email').value = row.cells[3].textContent;
            document.getElementById('phone').value = row.cells[4].textContent;

            editingRowIndex = Array.from(staffTable.rows).indexOf(row);
            document.getElementById('modal-title').textContent = 'Edit Staff';
            staffModal.style.display = 'flex';
        }

        if (e.target.classList.contains('delete-btn')) {
            const row = e.target.closest('tr');
            staffTable.deleteRow(row.rowIndex);
        }
    });
});

//student management
document.addEventListener('DOMContentLoaded', () => {
    const addStudentBtn = document.getElementById('add-student-btn');
    const studentModal = document.getElementById('student-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const studentForm = document.getElementById('student-form');
    const studentTable = document.getElementById('student-table').getElementsByTagName('tbody')[0];
    const searchInput = document.getElementById('search-input');
    let editingRowIndex = -1;

    // Show modal to add a new student
    addStudentBtn.addEventListener('click', () => {
        studentModal.style.display = 'flex';
        studentForm.reset();
        editingRowIndex = -1;
        document.getElementById('modal-title').textContent = 'Add Student';
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        studentModal.style.display = 'none';
    });

    // Handle form submission (Add/Edit student)
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('student-name').value;
        const grade = document.getElementById('grade').value;
        const department = document.getElementById('department').value;
        const email = document.getElementById('student-email').value;
        const phone = document.getElementById('student-phone').value;

        if (editingRowIndex > -1) {
            const row = studentTable.rows[editingRowIndex];
            row.cells[0].textContent = name;
            row.cells[1].textContent = grade;
            row.cells[2].textContent = department;
            row.cells[3].textContent = email;
            row.cells[4].textContent = phone;
        } else {
            const newRow = studentTable.insertRow();
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${grade}</td>
                <td>${department}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
        }

        studentModal.style.display = 'none';
    });

    // Edit or delete student
    studentTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const row = e.target.closest('tr');
            document.getElementById('student-name').value = row.cells[0].textContent;
            document.getElementById('grade').value = row.cells[1].textContent;
            document.getElementById('department').value = row.cells[2].textContent;
            document.getElementById('student-email').value = row.cells[3].textContent;
            document.getElementById('student-phone').value = row.cells[4].textContent;

            editingRowIndex = Array.from(studentTable.rows).indexOf(row);
            document.getElementById('modal-title').textContent = 'Edit Student';
            studentModal.style.display = 'flex';
        }

        if (e.target.classList.contains('delete-btn')) {
            const row = e.target.closest('tr');
            studentTable.deleteRow(row.rowIndex);
        }
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        Array.from(studentTable.rows).forEach(row => {
            const cells = row.getElementsByTagName('td');
            let rowContainsSearchTerm = false;
            Array.from(cells).forEach(cell => {
                if (cell.textContent.toLowerCase().includes(searchTerm)) {
                    rowContainsSearchTerm = true;
                }
            });
            row.style.display = rowContainsSearchTerm ? '' : 'none';
        });
    });
});


//leave requests
document.addEventListener('DOMContentLoaded', () => {
    const leaveRequestsTable = document.getElementById('leave-requests-table').getElementsByTagName('tbody')[0];

    leaveRequestsTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('approve-btn')) {
            const row = e.target.closest('tr');
            const requestId = row.cells[0].textContent;
            handleLeaveRequest(requestId, 'approve');
            row.cells[6].textContent = 'Approved';
            e.target.disabled = true;
            row.querySelector('.reject-btn').disabled = true;
        }

        if (e.target.classList.contains('reject-btn')) {
            const row = e.target.closest('tr');
            const requestId = row.cells[0].textContent;
            handleLeaveRequest(requestId, 'reject');
            row.cells[6].textContent = 'Rejected';
            e.target.disabled = true;
            row.querySelector('.approve-btn').disabled = true;
        }
    });

    function handleLeaveRequest(requestId, action) {
        // Make an AJAX request to your backend to update the leave request status
        console.log(`Request ID: ${requestId} has been ${action}ed.`);
    }
});


//Notification section
// Include Font Awesome icons using their class names
const notifications = [
    { category: "staff", title: "New Staff Member Added", message: "John Doe has joined the Mathematics department.", icon: "fas fa-user-tie" },
    { category: "students", title: "Student Achievement", message: "Jane Doe won the science fair competition.", icon: "fas fa-user-graduate" },
    { category: "finance", title: "Budget Update", message: "New budget for 2024-2025 has been approved.", icon: "fas fa-coins" },
    { category: "events", title: "Annual Day Event", message: "Annual Day is scheduled for September 15.", icon: "fas fa-calendar-alt" },
    { category: "feedback", title: "New Complaint Filed", message: "A new complaint has been submitted by a student.", icon: "fas fa-comment-dots" }
];

function renderNotifications(filter = "all") {
    const notificationList = document.getElementById('notification-list');
    notificationList.innerHTML = ''; // Clear previous notifications

    const filteredNotifications = notifications.filter(n => filter === 'all' || n.category === filter);

    filteredNotifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.classList.add('notification-item', notification.category);

        notificationItem.innerHTML = `
            <i class="${notification.icon}" aria-hidden="true"></i>
            <div class="content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
            </div>
        `;

        notificationList.appendChild(notificationItem);
    });
}

document.getElementById('category-filter').addEventListener('change', (e) => {
    renderNotifications(e.target.value);
});

// Initial rendering
renderNotifications();

//calendar
let events = [];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

document.getElementById('event-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const type = document.getElementById('event-type').value;

    if (title && date) {
        const newEvent = { title, date, type };
        events.push(newEvent);
        renderEvents();
        clearForm();
    }
});

document.getElementById('prev-month').addEventListener('click', function() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar();
});

document.getElementById('next-month').addEventListener('click', function() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    renderCalendar();
});

function renderEvents() {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';

    events.forEach((event, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${event.title} (${event.type}) - ${event.date}</span>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        eventList.appendChild(listItem);
    });

    renderCalendar();
}

function deleteEvent(index) {
    events.splice(index, 1);
    renderEvents();
}

function clearForm() {
    document.getElementById('event-form').reset();
}

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // Clear previous calendar

    const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });
    document.getElementById('current-month').textContent = `${monthName} ${currentYear}`;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-day');
        day.textContent = i;

        // Check if there are events for this day
        events.forEach(event => {
            const eventDate = new Date(event.date);
            if (eventDate.getDate() === i && eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear) {
                const eventLabel = document.createElement('div');
                eventLabel.textContent = event.title;
                eventLabel.classList.add(event.type === 'holiday' ? 'holiday-label' : 'event-label');
                day.appendChild(eventLabel);
            }
        });

        calendar.appendChild(day);
    }
}

// Initial render
renderEvents();

//finance section
let financeRecords = [];

document.getElementById('finance-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const type = document.getElementById('finance-type').value;
    const amount = document.getElementById('finance-amount').value;
    const description = document.getElementById('finance-description').value;
    const date = new Date().toLocaleDateString();

    if (type && amount && description) {
        const newRecord = { type, amount, description, date };
        financeRecords.push(newRecord);
        renderFinanceRecords();
        clearFinanceForm();
    }
});

function renderFinanceRecords() {
    const recordsList = document.getElementById('finance-records-list');
    recordsList.innerHTML = '';

    financeRecords.forEach((record, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.type}</td>
            <td>$${record.amount}</td>
            <td>${record.description}</td>
            <td><button onclick="deleteFinanceRecord(${index})">Delete</button></td>
        `;
        recordsList.appendChild(row);
    });

    updateFinanceOverview();
}

function deleteFinanceRecord(index) {
    financeRecords.splice(index, 1);
    renderFinanceRecords();
}

function clearFinanceForm() {
    document.getElementById('finance-form').reset();
}

function updateFinanceOverview() {
    let totalIncome = 0;
    let totalExpenses = 0;
    let pendingPayments = 15000; // Example value, this could be calculated dynamically

    financeRecords.forEach(record => {
        if (record.type === 'income') {
            totalIncome += parseFloat(record.amount);
        } else if (record.type === 'expense') {
            totalExpenses += parseFloat(record.amount);
        }
    });

    const netBalance = totalIncome - totalExpenses;

    document.querySelector('.finance-card:nth-child(1) p').textContent = `$${totalIncome}`;
    document.querySelector('.finance-card:nth-child(2) p').textContent = `$${totalExpenses}`;
    document.querySelector('.finance-card:nth-child(3) p').textContent = `$${pendingPayments}`;
    document.querySelector('.finance-card:nth-child(4) p').textContent = `$${netBalance}`;
}

// Initial render
renderFinanceRecords();


//Complaint and feedback
const complaintsData = [
    { date: '2024-08-20', type: 'Complaint', description: 'Issue with course material', status: 'pending' },
    { date: '2024-08-18', type: 'Feedback', description: 'Need more practical labs', status: 'resolved' },
    { date: '2024-08-17', type: 'Complaint', description: 'Inadequate cafeteria facilities', status: 'pending' },
    // Add more sample data here...
];

function renderComplaintsList(filter = 'all') {
    const complaintsList = document.getElementById('complaints-list');
    complaintsList.innerHTML = '';

    const filteredData = complaintsData.filter(item => filter === 'all' || item.status === filter);

    filteredData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.type}</td>
            <td>${item.description}</td>
            <td>${item.status}</td>
            <td>
                ${item.status === 'pending' ? `
                    <button class="approve-btn" onclick="updateComplaintStatus(${index}, 'resolved')">Approve</button>
                    <button class="reject-btn" onclick="updateComplaintStatus(${index}, 'rejected')">Reject</button>
                ` : ''}
            </td>
        `;
        complaintsList.appendChild(row);
    });
}

function updateComplaintStatus(index, newStatus) {
    complaintsData[index].status = newStatus;
    renderComplaintsList(document.getElementById('filter-status').value);
}

document.getElementById('filter-status').addEventListener('change', function() {
    renderComplaintsList(this.value);
});

// Initial render
renderComplaintsList();

//Reports and analytics section

const reportData = {
    'student-performance': {
        labels: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],
        datasets: [{
            label: 'Average Grades',
            data: [85, 88, 90, 87],
            backgroundColor: '#007bff'
        }]
    },
    'teacher-performance': {
        labels: ['Teacher A', 'Teacher B', 'Teacher C'],
        datasets: [{
            label: 'Performance Rating',
            data: [4.2, 4.8, 4.5],
            backgroundColor: '#28a745'
        }]
    },
    'financial-overview': {
        labels: ['Revenue', 'Expenses'],
        datasets: [{
            label: 'Financial Overview',
            data: [500000, 350000],
            backgroundColor: ['#17a2b8', '#dc3545']
        }]
    },
    'attendance': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
            label: 'Attendance Rate',
            data: [95, 92, 90, 94],
            backgroundColor: '#ffc107'
        }]
    }
};

function renderChart(reportType) {
    const chartContainer = document.getElementById('chart-container');
    
    // Clear previous chart if any
    chartContainer.innerHTML = '<canvas id="reportChart"></canvas>';

    const ctx = document.getElementById('reportChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // You can change this to 'line', 'pie', etc.
        data: reportData[reportType],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += `${context.parsed.y}`;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.getElementById('report-type').addEventListener('change', function() {
    renderChart(this.value);
});

// Initial render
renderChart('student-performance');
