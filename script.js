// Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
            
            // Close menu when clicking a link
            const links = document.querySelectorAll('.nav-links a');
            links.forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!event.target.closest('nav')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        }
        
        // Form submission handling
        const form = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(form);
                const submitButton = form.querySelector('.btn-submit');
                const originalButtonText = submitButton.textContent;
                
                // Disable button and show loading state
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        formStatus.className = 'success';
                        formStatus.textContent = 'Thank you! We\'ll contact you within 24-48 hours to schedule your consultation.';
                        form.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(error => {
                    formStatus.className = 'error';
                    formStatus.textContent = 'Oops! There was a problem submitting your form. Please try again or email us directly.';
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    formStatus.style.display = 'block';
                    
                    // Scroll to status message
                    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                });
            });
        }
