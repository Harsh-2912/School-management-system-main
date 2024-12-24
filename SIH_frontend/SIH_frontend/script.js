document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".login-section");
    const container = document.querySelector(".login-container");

    sections.forEach(section => {
        section.addEventListener("click", function() {
            // Reset all sections
            sections.forEach(sec => sec.classList.remove("active"));
            container.classList.remove("active");

            // Activate the clicked section
            section.classList.add("active");
            container.classList.add("active");
        });
    });
});


//password recovery
document.addEventListener("DOMContentLoaded", function() {
    const forgotPasswordLinks = document.querySelectorAll(".forgot-password");
    const modal = document.getElementById("forgotPasswordModal");
    const closeModal = document.querySelector(".close");

    // Open modal when "Forgot Password?" is clicked
    forgotPasswordLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            modal.style.display = "block"; // Show modal
        });
    });

    // Close modal when the close button is clicked
    closeModal.addEventListener("click", function() {
        modal.style.display = "none"; // Hide modal
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none"; // Hide modal
        }
    });
});
