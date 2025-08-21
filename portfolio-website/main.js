document.addEventListener('DOMContentLoaded', () => {
    // Contact form handling
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            emailjs.sendForm('service_bvuw3no', 'template_bci2ukg', form)
                .then(() => {
                    formMessage.textContent = "Thank you! Your message has been sent.";
                    formMessage.style.opacity = 0;
                    formMessage.style.transition = "opacity 0.8s";
                    setTimeout(() => {
                        formMessage.style.opacity = 1;
                    }, 100);
                    form.reset();
                }, (error) => {
                    formMessage.textContent = "Oops! Something went wrong. Please try again.";
                });
        });
    }

    // Accordion for skills
    const categories = document.querySelectorAll(".skill-category");

    categories.forEach(cat => {
        const title = cat.querySelector(".category-title");

        title.addEventListener("click", () => {
            if (cat.classList.contains("active")) {
                // If already open, close it
                cat.classList.remove("active");
            } else {
                // Close all others
                categories.forEach(c => c.classList.remove("active"));
                // Open clicked
                cat.classList.add("active");
            }
        });
    });
});
