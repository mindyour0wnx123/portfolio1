document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    const closeMenu = () => {
        navMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', () => {
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const rect = targetSection.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    navLinks.forEach(l => l.style.color = '#1a1a1a');
                    link.style.color = '#6C3BAA';
                }
            }
        });

        const modal = document.querySelector('#screenshot-modal');
        const modalTitle = document.querySelector('#screenshot-modal-title');
        const closeButton = document.querySelector('.modal-close');
        const screenshotImages = document.querySelectorAll('.modal-gallery img');
        let lastFocusedElement;

        const projectTitles = {
            hydrofarm: 'HydroFarm Monitoring System',
            ecommerce: 'E-commerce Web Application',
            'little-explorer': 'Educational Mobile Application'
        };

        const closeModal = () => {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
            screenshotImages.forEach(image => image.classList.remove('is-visible', 'is-enlarged'));
            if (lastFocusedElement) lastFocusedElement.focus();
        };

        document.querySelectorAll('.screenshot-button').forEach(button => {
            button.addEventListener('click', () => {
                const project = button.dataset.project;
                lastFocusedElement = button;
                modalTitle.textContent = projectTitles[project];
                screenshotImages.forEach(image => {
                    image.classList.toggle('is-visible', image.dataset.project === project);
                    image.classList.remove('is-enlarged');
                });
                modal.classList.add('is-open');
                modal.setAttribute('aria-hidden', 'false');
                document.body.classList.add('modal-open');
                closeButton.focus();
            });
        });

        screenshotImages.forEach(image => {
            image.addEventListener('click', () => {
                image.classList.toggle('is-enlarged');
            });
        });

        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', event => {
            if (event.target === modal) closeModal();
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
        });
    });
});
