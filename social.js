document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SPORTS STREAMS CATEGORY FILTERS
    // ==========================================
    const filterPills = document.querySelectorAll('.filter-pill');
    const feedCards = document.querySelectorAll('.feed-card');

    // Run this function immediately to hide everything except the active tab (Track & Field)
    function initializeFilters() {
        const activePill = document.querySelector('.filter-pill.active');
        if (activePill) {
            const defaultSport = activePill.getAttribute('data-sport');
            feedCards.forEach(card => {
                if (card.getAttribute('data-category') === defaultSport) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        }
    }
    initializeFilters();

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const selectedSport = pill.getAttribute('data-sport');

            feedCards.forEach(card => {
                if (card.getAttribute('data-category') === selectedSport) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // ==========================================
    // 2. MICRO-INTERACTION CLAP LOGIC
    // ==========================================
    const clapButtons = document.querySelectorAll('.clap-btn');

    clapButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const countSpan = btn.querySelector('span');
            let currentClaps = parseInt(countSpan.textContent, 10);

            if (!btn.classList.contains('clapped')) {
                btn.classList.add('clapped');
                countSpan.textContent = currentClaps + 1;
                btn.style.boxShadow = '0 0 15px rgba(254, 237, 2, 0.3)'; // Neon burst
            } else {
                btn.classList.remove('clapped');
                countSpan.textContent = currentClaps - 1;
                btn.style.boxShadow = 'none';
            }
        });
    });

    // ==========================================
    // 3. KINETIC PARALLAX ENGINE WITH BUTTON CONTROLS
    // ==========================================
    const sidebarViewport = document.getElementById('sidebar-viewport');
    const sidebarTrack = document.getElementById('sidebar-track');
    const btnUp = document.getElementById('btn-scroll-up');
    const btnDown = document.getElementById('btn-scroll-down');

    if (sidebarViewport && sidebarTrack) {
        let targetY = 0;
        let currentY = 0;
        const ease = 0.08; // Controls the "heaviness/inertia" of the scroll
        let isHovering = false;
        
        // This calculates exactly how far one node should slide down (approx height of iframe + gap)
        const scrollStep = 850; 

        sidebarViewport.addEventListener('mouseenter', () => isHovering = true);
        sidebarViewport.addEventListener('mouseleave', () => isHovering = false);

        // Physics Boundary Calculator
        function updateScrollLimits() {
            const maxScroll = sidebarTrack.scrollHeight - sidebarViewport.clientHeight + 40;
            if (targetY < 0) targetY = 0;
            if (targetY > maxScroll) targetY = maxScroll;
        }

        // MOUSE WHEEL CONTROL
        sidebarViewport.addEventListener('wheel', (e) => {
            if (isHovering) {
                e.preventDefault(); 
                targetY += e.deltaY * 0.8; // Scroll speed multiplier
                updateScrollLimits();
            }
        }, { passive: false });

        // BUTTON CONTROLS
        if (btnUp && btnDown) {
            btnUp.addEventListener('click', () => {
                targetY -= scrollStep;
                updateScrollLimits();
            });

            btnDown.addEventListener('click', () => {
                targetY += scrollStep;
                updateScrollLimits();
            });
        }

        // The Smooth Animation Loop
        function animateSidebar() {
            currentY += (targetY - currentY) * ease;
            sidebarTrack.style.transform = `translateY(${-currentY}px)`;
            requestAnimationFrame(animateSidebar);
        }
        
        animateSidebar();
    }
});