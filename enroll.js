document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MOBILE HAMBURGER MENU LOGIC
    // ==========================================
    const hamburger = document.querySelector('.hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            // Optional: prevent scroll when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking the X button
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // 2. 3D MAGNETIC HOVER EFFECT
    // ==========================================
    const card = document.getElementById('magnetic-card');
    const wrapper = document.querySelector('.perspective-wrapper');

    if (wrapper && card) {
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            
            // Calculate mouse position relative to the center of the card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation degrees
            const rotateX = ((y - centerY) / 20) * -1; 
            const rotateY = (x - centerX) / 20;

            // Apply transform
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset card to flat when mouse leaves
        wrapper.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg)`;
            card.style.transition = 'transform 0.5s ease-out';
        });

        wrapper.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out';
        });
    }

    // ==========================================
    // 3. FORM SUBMISSION LOGIC
    // ==========================================
    const form = document.getElementById('waitlist-form');
    const statusMsg = document.getElementById('status-message');
    const btn = document.querySelector('.btn-enroll');
    const btnText = document.querySelector('.btn-text');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // UI State Change
            if (btn) {
                btn.style.background = 'var(--dark)';
                btn.style.border = '1px solid var(--accent)';
                btnText.style.color = 'var(--accent)';
                btnText.textContent = 'VERIFYING BIOMETRICS...';
            }
            
            if (statusMsg) {
                statusMsg.style.color = 'rgba(255, 255, 255, 0.7)';
                statusMsg.textContent = 'Connecting to Athogram Engine...';
            }

            // Simulate API interaction
            setTimeout(() => {
                if (btn) {
                    btn.style.background = 'var(--accent)';
                    btn.style.border = 'none';
                    btnText.style.color = 'var(--dark)';
                    btnText.textContent = 'ACCESS GRANTED';
                }
                
                if (statusMsg) {
                    statusMsg.style.color = 'var(--accent)';
                    statusMsg.textContent = 'Welcome to the Elite Roster. Credentials Sent.';
                }
                
                form.reset();
            }, 2000);
        });
    }
});