document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed so it doesn't replay when scrolling up
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .stagger');
    fadeElements.forEach(el => scrollObserver.observe(el));

    // 2. Hide/Show Header on scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide nav on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 80) {
            header.classList.add('nav-up');
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        } else {
            header.classList.remove('nav-up');
        }
        
        lastScroll = currentScroll;
    });

    // 3. Mobile Navigation Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        if(navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden'; // prevent scrolling
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    menuToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // 4. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Basic Form Validation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            // Simple validation is handled by HTML5 `required` attribute, 
            // but we can add custom feedback here
            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Simulate sending data API call
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                
                formStatus.style.color = 'var(--accent)';
                formStatus.textContent = "Thank you! I'll get back to you soon.";
                
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1000);
        });
    }
});
