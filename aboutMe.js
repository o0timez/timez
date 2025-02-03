`
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal, icon, close button, and modal content
    const modal = document.getElementById("about-me-modal");
    const icon = document.getElementById("about-me-gif");
    const closeBtn = document.getElementsByClassName("close")[0];
    const modalContent = document.getElementById("about-me-content");

    // Open the modal when the icon is clicked
    icon.addEventListener("click", function() {
        modal.style.display = "block";

        // Load the content from aboutme.txt
        fetch('About me/aboutme.txt')
        .then(response => response.text())
        .then(text => {
            modalContent.textContent = text;
        })
        .catch(error => console.error('Error:', error));
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
