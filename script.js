document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const githubBtn = document.querySelector('.nav-container .btn-github-outline');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        githubBtn.classList.toggle('active');
        
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ti-menu-2');
            icon.classList.add('ti-x');
        } else {
            icon.classList.remove('ti-x');
            icon.classList.add('ti-menu-2');
        }
    });

    // Intersection Observer for active nav links
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
