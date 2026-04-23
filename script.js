document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-container a');

    const updateActiveSection = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Offset to account for the fixed navbar
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        // Ensure the last section highlights when scrolled to the absolute bottom
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 10) {
            current = sections[sections.length - 1].getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    // Run once on load to set initial state
    updateActiveSection();

    // Update on scroll
    window.addEventListener('scroll', updateActiveSection, { passive: true });

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

    // Close menu when scrolling the page
    window.addEventListener('scroll', () => {
        if (navLinksWrapper.classList.contains('active')) {
            toggleMenu();
        }
    }, { passive: true });

    // Project Show More Logic
    const projectsWrapper = document.getElementById('projects-wrapper');
    const projectsGrid = document.querySelector('.projects-grid');
    const projectCards = document.querySelectorAll('.project-card');
    const showMoreBtn = document.getElementById('show-more-btn');
    const showMoreContainer = document.querySelector('.show-more-container');

    if (projectsWrapper && projectCards.length > 2) {
        const setInitialHeight = () => {
            if (!projectsWrapper.classList.contains('expanded')) {
                // Get the second card
                const secondCard = projectCards[1];
                // Set height to show the first two cards completely, plus 80px to show a glimpse of the rest
                const wrapperHeight = secondCard.offsetTop + secondCard.offsetHeight + 80;
                projectsWrapper.style.maxHeight = `${wrapperHeight}px`;
            }
        };

        // Ensure images/layout are calculated before setting height
        setTimeout(setInitialHeight, 50);
        
        window.addEventListener('resize', () => {
            if (!projectsWrapper.classList.contains('expanded')) {
                setInitialHeight();
            } else {
                projectsWrapper.style.maxHeight = `${projectsGrid.scrollHeight + 50}px`;
            }
        });

        showMoreBtn.addEventListener('click', () => {
            projectsWrapper.classList.toggle('expanded');
            if (projectsWrapper.classList.contains('expanded')) {
                projectsWrapper.style.maxHeight = `${projectsGrid.scrollHeight + 50}px`;
                showMoreBtn.textContent = 'Show Less';
            } else {
                setInitialHeight();
                showMoreBtn.textContent = 'Show More';
                
                // Scroll back if needed
                const projectsSection = document.getElementById('projects');
                const navOffset = 100;
                if (window.scrollY > projectsSection.offsetTop) {
                    window.scrollTo({
                        top: projectsSection.offsetTop - navOffset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    } else if (showMoreContainer) {
        showMoreContainer.style.display = 'none';
        const fade = document.getElementById('projects-fade');
        if (fade) fade.style.display = 'none';
    }
});
