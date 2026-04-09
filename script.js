document.addEventListener('DOMContentLoaded', () => {
    const projectImages = document.querySelectorAll('.image-crop');

    projectImages.forEach(image => {
        // Toggle on image click
        image.addEventListener('click', function(e) {
            // If we click the CLOSE button, let the other listener handle it
            if (e.target.classList.contains('close-btn')) return;
            
            this.classList.add('expanded');
            document.body.style.overflow = 'hidden';
        });

        // Specific logic for the CLOSE button
        const closeBtn = image.querySelector('.close-btn');
        closeBtn.innerHTML = "&times;"; // Adds a clean '×' symbol
        
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevents the image from re-expanding
            image.classList.remove('expanded');
            document.body.style.overflow = 'auto';
        });
    });

    // Also close if the user hits the Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const expanded = document.querySelector('.image-crop.expanded');
            if (expanded) {
                expanded.classList.remove('expanded');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
    .then(() => {
      // Hide the form and show the success message
      contactForm.style.display = 'none';
      successMessage.style.display = 'block';
    })
    .catch((error) => alert("Form submission failed: " + error));
  });
}