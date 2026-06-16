document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. TOP WAITLIST FORM LOGIC
    // ==========================================
    const form = document.getElementById('waitlist-form');
    const statusMsg = document.getElementById('status-message');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailValue = document.getElementById('email').value.trim();
            statusMsg.style.color = 'rgba(255, 255, 255, 0.7)';
            statusMsg.textContent = 'Verifying athlete credentials...';

            try {
                const response = await fetch('http://localhost:5000/api/waitlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: emailValue })
                });
                const data = await response.json();
                if (response.ok) {
                    statusMsg.style.color = 'var(--white)'; 
                    statusMsg.textContent = 'Success! Welcome to the elite roster.';
                    form.reset();
                } else {
                    statusMsg.style.color = 'var(--accent)'; 
                    statusMsg.textContent = data.error || 'Registration failed. Try again.';
                }
            } catch (err) {
                statusMsg.style.color = 'var(--accent)';
                statusMsg.textContent = 'Server is offline. Ensure backend is running.';
            }
        });
    }

    // ==========================================
    // 2. KINETIC MONOLITH SCROLL ANIMATION
    // ==========================================
    const monolithFills = document.querySelectorAll('.monolith-fill');
    const monolithObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                monolithFills.forEach(pillar => {
                    const targetHeight = pillar.getAttribute('data-height');
                    pillar.style.height = targetHeight;
                    pillar.classList.add('active'); 
                });
            } else {
                monolithFills.forEach(pillar => {
                    pillar.style.height = '0%';
                    pillar.classList.remove('active');
                });
            }
        });
    }, { threshold: 0.3 }); 

    const realitySection = document.getElementById('reality-section');
    if (realitySection) {
        monolithObserver.observe(realitySection);
    }

    // ==========================================
    // 3. CINEMATIC SCROLL REVEAL (CARDS)
    // ==========================================
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.scroll-reveal, .scroll-reveal-up').forEach(el => cardObserver.observe(el));

    // ==========================================
    // 4. GAMIFIED TERMINAL CTA LOGIC
    // ==========================================
    const terminalForm = document.getElementById('terminal-form');
    const terminalStatus = document.getElementById('terminal-status');

    if (terminalForm) {
        terminalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('terminal-email').value;
            
            const btn = terminalForm.querySelector('.terminal-btn');
            const input = document.getElementById('terminal-email');
            btn.disabled = true;
            input.disabled = true;
            btn.style.opacity = '0.5';

            let sequence = [
                "> Initiating NSRS protocol...",
                "> Encrypting athlete data: " + email,
                "> VERIFICATION SUCCESSFUL.",
                "> ACCESS GRANTED. Welcome to the Roster."
            ];
            
            let delay = 0;
            terminalStatus.style.color = "var(--white)";

            sequence.forEach((text, index) => {
                setTimeout(() => {
                    terminalStatus.innerHTML = text + '<span class="blinking-cursor">_</span>';
                    
                    if (index === sequence.length - 1) {
                        terminalStatus.style.color = "var(--accent)";
                        terminalStatus.style.textShadow = "0 0 10px rgba(254,237,2,0.5)";
                    }
                }, delay);
                delay += 800; 
            });
        });
    }

 // ==========================================
    // 5. GLASSMORPHIC MOBILE MENU & X-ANIMATION
    // ==========================================
    const hamburger = document.querySelector('.hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const menuLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-sign-up');

    if (hamburger && mobileMenu && closeMenuBtn) {
        
        // This function handles opening/closing
        const toggleMenu = () => {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active'); // Triggers the X animation
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : ''; 
        };

        hamburger.addEventListener('click', toggleMenu);

        // Close menu function
        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active'); // Reverts to hamburger
            document.body.style.overflow = '';
        };

        closeMenuBtn.addEventListener('click', closeMenu);
        menuLinks.forEach(link => link.addEventListener('click', closeMenu));
    }
});

// ==========================================
    // AI COACH EXPANDABLE DRAWER (CLICK EVENT)
    // ==========================================
    const aiCoachBanner = document.getElementById('ai-coach-banner');
    
    if (aiCoachBanner) {
        aiCoachBanner.addEventListener('click', function() {
            this.classList.toggle('is-expanded');
        });
    }


    