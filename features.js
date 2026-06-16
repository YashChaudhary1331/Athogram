document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL REVEAL (Cards fading up smoothly)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => scrollObserver.observe(el));


    // 2. MATRIX TRACKING (Scroll Spy for the left sidebar)
    // FIX: Changed from '.cartridge-block' to '.showcase-section'
    const sections = document.querySelectorAll('.showcase-section');
    const navLinks = document.querySelectorAll('.spy-link');

    const spyOptions = {
        root: null,
        // Triggers active state when the section hits the exact middle of the viewport
        rootMargin: '-50% 0px -50% 0px', 
        threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to the matching link
                const activeLink = document.querySelector(`.spy-link[href="#${activeId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, spyOptions);

    sections.forEach(section => spyObserver.observe(section));

    // ==========================================
    // 5. GLASSMORPHIC MOBILE MENU & X-ANIMATION
    // ==========================================
    const hamburger = document.querySelector('.hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const menuLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-sign-up');

    if (hamburger && mobileMenu && closeMenuBtn) {
        
        // Handle opening/closing
        const toggleMenu = () => {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active'); // Triggers the X animation
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : ''; 
        };

        hamburger.addEventListener('click', toggleMenu);

        // Handle closing
        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active'); // Reverts to hamburger
            document.body.style.overflow = '';
        };

        closeMenuBtn.addEventListener('click', closeMenu);
        menuLinks.forEach(link => link.addEventListener('click', closeMenu));
    }
});