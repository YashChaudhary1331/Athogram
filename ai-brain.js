document.addEventListener("DOMContentLoaded", () => {
    // MOBILE MENU TOGGLE LOGIC
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        // Toggle menu when clicking hamburger
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close menu automatically if a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
    const svgCanvas = document.getElementById('branch-canvas');
    const brain = document.getElementById('brain');
    const nodes = document.querySelectorAll('.feature-node');
    const hubContainer = document.getElementById('hub-container');

    // Skip drawing SVG lines on mobile, just ensure cards are visible
    if (window.innerWidth <= 768) {
        nodes.forEach(node => node.classList.add('visible'));
        return; 
    }

    function drawBranch(node, delay) {
        // GET PRECISE RENDERED POSITIONS (Fixes the offset bug)
        const containerRect = hubContainer.getBoundingClientRect();
        const brainRect = brain.getBoundingClientRect();
        const nodeRect = node.getBoundingClientRect();

        // Calculate absolute center of the brain RELATIVE to the container
        const brainX = (brainRect.left - containerRect.left) + (brainRect.width / 2);
        const brainY = (brainRect.top - containerRect.top) + (brainRect.height / 2);
        
        // Find exact coordinates to connect to the feature node
        const isLeftSide = node.classList.contains('left-side');
        
        // Pin to inner edges of the cards
        const nodeX = isLeftSide ? (nodeRect.right - containerRect.left) : (nodeRect.left - containerRect.left);
        const nodeY = (nodeRect.top - containerRect.top) + (nodeRect.height / 2);

        // Calculate smooth bezier S-curve
        const controlPointX = brainX + (isLeftSide ? -150 : 150);
        
        const pathString = `M ${brainX} ${brainY} C ${controlPointX} ${brainY}, ${nodeX} ${nodeY}, ${nodeX} ${nodeY}`;

        // Create and append the SVG Path
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathString);
        path.setAttribute("class", "branch-line");
        svgCanvas.appendChild(path);

        // Animate line stroke, then fade in the target card
        setTimeout(() => {
            path.style.strokeDashoffset = "0";
            setTimeout(() => {
                node.classList.add('visible');
            }, 300); 
        }, delay);
    }

    // Sequence the drawing with a slight cascade delay
    let currentDelay = 100;
    nodes.forEach((node) => {
        drawBranch(node, currentDelay);
        currentDelay += 150; 
    });
});