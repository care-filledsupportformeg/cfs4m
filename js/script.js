// js/script.js

document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // In a real application, you'd likely use Fetch API or XMLHttpRequest here.
            // For example, sending data to a backend or a service like Formspree/Netlify Forms.
            // Example using fetch (ensure your form has action and method attributes set up):
            /*
            fetch(event.target.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert('Oops! There was a problem submitting your form.');
                        }
                    }).catch(() => {
                        alert('Oops! There was a problem submitting your form and parsing the error.');
                    });
                }
            }).catch(error => {
                console.error('Form submission error:', error);
                alert('Oops! There was a problem submitting your form.');
            });
            */
            // Current placeholder:
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Prevent action if href is just "#" or empty, or an invalid selector start.
            if (!targetId || targetId === '#' || targetId.length <= 1 || !targetId.startsWith('#')) {
                return;
            }
            
            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (error) {
                // This will catch errors if targetId is not a valid CSS selector
                console.warn('Smooth scroll failed for selector:', targetId, error);
            }
        });
    });

    // Highlight active nav link
    // Get the name of the current HTML file (e.g., "index.html", "about.html")
    const currentPath = window.location.pathname;
    const pageFileName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const activePage = pageFileName === '' ? 'index.html' : pageFileName; // Default to index.html if path is empty
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref) {
            // Check if the link's href is the same as the active page
            if (linkHref === activePage || linkHref === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
    
    // Fade-in elements on scroll using Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    
    // Check if IntersectionObserver is supported
    if (fadeElements.length > 0 && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target); // Stop observing once visible to save resources
                }
            });
        }, { 
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        fadeElements.forEach(el => {
            observer.observe(el);
        });
    } else if (fadeElements.length > 0) {
        // Fallback for older browsers: just make them visible
        fadeElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }
});
