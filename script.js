/**
 * Portfolio Website Interactions & Night Mode Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================================
    // NIGHT MODE / DARK MODE TOGGLE LOGIC
    // Uses CSS Media Queries to detect default browser theme
    // ========================================================
    const headerToggleBtn = document.getElementById('theme-toggle');
    const heroPixelToggleBtn = document.getElementById('hero-pixel-toggle');
    const htmlElement = document.documentElement;
    const headerToggleLabel = headerToggleBtn ? headerToggleBtn.querySelector('.toggle-label') : null;
    const heroToggleLabel = document.getElementById('hero-toggle-label');

    // CSS Media Query for Browser Default Color Scheme
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Retrieve saved theme preference if explicitly toggled before
    const savedTheme = localStorage.getItem('theme');
    
    // Determine initial theme: saved preference or CSS media query detection
    const initialTheme = savedTheme || (darkModeMediaQuery.matches ? 'dark' : 'light');
    applyTheme(initialTheme, false);

    // Event listener for Header Night Mode Toggle Button
    if (headerToggleBtn) {
        headerToggleBtn.addEventListener('click', () => {
            toggleCurrentTheme();
        });
    }

    // Event listener for Hero Section Pixel Art Toggle Button
    if (heroPixelToggleBtn) {
        heroPixelToggleBtn.addEventListener('click', () => {
            toggleCurrentTheme();
        });
    }

    // Toggle between light and dark modes
    function toggleCurrentTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme') || (darkModeMediaQuery.matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme, true);
    }

    // Apply theme & update all UI toggle representations
    function applyTheme(theme, savePreference = true) {
        htmlElement.setAttribute('data-theme', theme);
        
        if (savePreference) {
            localStorage.setItem('theme', theme);
        }

        // Update Header Button Label & Title
        if (headerToggleLabel) {
            headerToggleLabel.textContent = theme === 'dark' ? 'Night Mode' : 'Light Mode';
        }
        if (headerToggleBtn) {
            headerToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Night Mode');
            headerToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Toggle Light Mode' : 'Toggle Night Mode');
        }

        // Update Hero Pixel Toggle Status & Label
        if (heroToggleLabel) {
            heroToggleLabel.textContent = theme === 'dark' ? 'NIGHT MODE' : 'DAY MODE';
        }
        if (heroPixelToggleBtn) {
            heroPixelToggleBtn.setAttribute('title', theme === 'dark' ? 'Current: Night Mode (Click for Day)' : 'Current: Day Mode (Click for Night)');
            heroPixelToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Toggle Day Mode' : 'Toggle Night Mode');
        }
    }

    // Listen to OS / Browser Theme changes via CSS Media Query
    // Automatically adapts if user hasn't explicitly set a preference
    darkModeMediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const systemTheme = e.matches ? 'dark' : 'light';
            applyTheme(systemTheme, false);
        }
    });

    // ========================================================
    // MOBILE / TABLET VERTICAL NAVIGATION MENU TOGGLE
    // ========================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    function closeMobileMenu() {
        if (navMenu && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    }

    function openMobileMenu() {
        if (navMenu) {
            navMenu.classList.add('open');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.add('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            }
        }
    }

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('open');
            mobileMenuBtn.classList.toggle('open', isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu when any nav link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                closeMobileMenu();
                mobileMenuBtn.focus();
            }
        });

        // Close menu when resized to desktop viewport
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                closeMobileMenu();
            }
        });
    }

    // ========================================================
    // ACTIVE NAVIGATION LINK OBSERVER ON SCROLL
    // ========================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
