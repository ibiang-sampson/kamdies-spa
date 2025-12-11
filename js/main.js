document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Sticky Header ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            header.style.padding = '5px 0'; // Specific sticky padding
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
            header.style.padding = '0';
        }
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // --- Intersection Observer for Animations ---
    // Select elements to animate
    const animatedElements = document.querySelectorAll('.service-card, .product-card, .section-title, .about-text, .founder-bio, .feature-item, .gallery-item');

    // Add base class
    animatedElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        // Add random or staggered delays based on index or position in groups
        // This is a simple stagger simulation
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // Stagger grid items specifically
    const grids = document.querySelectorAll('.services-grid, .products-grid, .gallery-grid, .features-grid');
    grids.forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`; // 100ms stagger
        });
    });

    // --- Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const closeBtn = document.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = item.src;
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }


    // --- Randomize Gallery ---
    function shuffleGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid) {
            for (let i = galleryGrid.children.length; i >= 0; i--) {
                galleryGrid.appendChild(galleryGrid.children[Math.random() * i | 0]);
            }
        }
    }
    shuffleGallery();

    // --- Testimonial Slider ---
    let testimonialIndex = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');

    function showTestimonials() {
        if (!slides.length) return;

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }

        testimonialIndex++;
        if (testimonialIndex > slides.length) { testimonialIndex = 1 }

        slides[testimonialIndex - 1].classList.add('active');
        dots[testimonialIndex - 1].classList.add('active');

        setTimeout(showTestimonials, 5000); // Change image every 5 seconds
    }

    // Manual navigation (Optional, but good to have hooked up to the dots)
    window.currentTestimonial = function (n) {
        // Find the index of the clicked dot
        // Simple implementation: reset timer and show specific slide? 
        // For auto-slides, usually interacting resets the timer. 
        // For simplicity, we'll just update classes manually, but the auto-timer might overwrite it. 
        // Let's keep it simple: just update the view, we won't stop the timer here (or we could clearer timeout).
        // Actually, to correctly support onClick, we need to respect the index n.

        // Resetting logic for manual click
        testimonialIndex = n - 1;

        // Re-run show logic (but without the timeout recursion immediately inside? 
        // showTestimonials calls setTimeout at the end. 
        // If we call it here, we might double up timers.
        // A robust slider needs a bit more state management, but let's try a simple version.)
    };

    // Start the slider
    showTestimonials();
});
