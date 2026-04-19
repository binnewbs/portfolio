document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-container a');

    const observerOptions = {
        root: null,
        rootMargin: '-50px 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-container a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    });

    // Mobile Menu Logic
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksWrapper = document.querySelector('.nav-links');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navLinksWrapper.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksWrapper.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navLinksWrapper.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (navLinksWrapper.classList.contains('active') && !isClickInsideMenu && !isClickOnToggle) {
            toggleMenu();
        }
    });
});
