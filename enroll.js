document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. 3D MAGNETIC HOVER EFFECT
    // ==========================================
    const card = document.getElementById('magnetic-card');
    const wrapper = document.querySelector('.perspective-wrapper');

    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation degrees (Higher divider = more subtle tilt)
        const rotateX = ((y - centerY) / 20) * -1; // Invert Y axis
        const rotateY = (x - centerX) / 20;

        // Apply dynamic transform
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset card to flat when mouse leaves
    wrapper.addEventListener('mouseleave', () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        card.style.transition = 'transform 0.5s ease-out'; // Smooth snap back
    });

    wrapper.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease-out'; // Remove lag during hover
    });

    // ==========================================
    // 2. ENROLLMENT SUBMISSION LOGIC
    // ==========================================
    const form = document.getElementById('waitlist-form');
    const statusMsg = document.getElementById('status-message');
    const btn = document.querySelector('.btn-enroll');
    const btnText = document.querySelector('.btn-text');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animate Button State
        btn.style.background = 'var(--dark)';
        btn.style.border = '1px solid var(--accent)';
        btnText.style.color = 'var(--accent)';
        btnText.textContent = 'VERIFYING BIOMETRICS...';
        statusMsg.style.color = 'rgba(255, 255, 255, 0.7)';
        statusMsg.textContent = 'Connecting to Athogram Engine...';

        // Simulate API call delay
        setTimeout(() => {
            btn.style.background = 'var(--accent)';
            btn.style.border = 'none';
            btnText.style.color = 'var(--dark)';
            btnText.textContent = 'ACCESS GRANTED';
            
            statusMsg.style.color = 'var(--accent)';
            statusMsg.textContent = 'Welcome to the Elite Roster. Credentials Sent.';
            
            form.reset();
            
            // Snap back to normal after 3 seconds
            setTimeout(() => {
                btn.style.background = 'var(--primary)';
                btnText.style.color = 'var(--white)';
                btnText.textContent = 'SECURE MY SPOT';
                statusMsg.textContent = '';
            }, 4000);

        }, 2000);
    });
});