// Zoom Preview Effect - Shows actual page content in miniature

document.addEventListener('DOMContentLoaded', () => {
    let isZoomedOut = false;
    let isAnimating = false;
    let hasTriggered = false;
    const scrollThreshold = 50;
    
    // Create wrapper for zoom effect
    function initZoomEffect() {
        // Wrap all main content in a zoom container
        const main = document.querySelector('main') || document.body;
        const sections = document.querySelectorAll('section');
        const nav = document.querySelector('.nav-floating');
        
        // Create zoom wrapper
        const zoomWrapper = document.createElement('div');
        zoomWrapper.id = 'zoom-wrapper';
        zoomWrapper.style.cssText = `
            transform-origin: center top;
            transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform;
            width: 100%;
            min-height: 100vh;
        `;
        
        // Move all sections into zoom wrapper
        sections.forEach(section => {
            zoomWrapper.appendChild(section);
        });
        
        // Insert zoom wrapper after nav
        if (nav && nav.nextSibling) {
            nav.parentNode.insertBefore(zoomWrapper, nav.nextSibling);
        } else {
            document.body.appendChild(zoomWrapper);
        }
        
        // Create overlay for zoom out view
        const zoomOverlay = document.createElement('div');
        zoomOverlay.id = 'zoom-overlay';
        zoomOverlay.innerHTML = `
            <div class="zoom-header">
                <h2 class="zoom-title">Three Connect - Complete Overview</h2>
                <p class="zoom-subtitle">Scroll to explore each section</p>
            </div>
            <div class="zoom-navigation">
                <div class="zoom-nav-item" data-section="home">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </div>
                <div class="zoom-nav-item" data-section="services">
                    <i class="fas fa-briefcase"></i>
                    <span>Services</span>
                </div>
                <div class="zoom-nav-item" data-section="about">
                    <i class="fas fa-info-circle"></i>
                    <span>About</span>
                </div>
                <div class="zoom-nav-item" data-section="process">
                    <i class="fas fa-cogs"></i>
                    <span>Process</span>
                </div>
                <div class="zoom-nav-item" data-section="projects">
                    <i class="fas fa-folder-open"></i>
                    <span>Projects</span>
                </div>
                <div class="zoom-nav-item" data-section="contact">
                    <i class="fas fa-envelope"></i>
                    <span>Contact</span>
                </div>
            </div>
            <div class="zoom-hint">
                <i class="fas fa-mouse"></i>
                <span>Continue scrolling to zoom in</span>
            </div>
        `;
        document.body.appendChild(zoomOverlay);
        
        // Add click handlers to navigation items
        const navItems = zoomOverlay.querySelectorAll('.zoom-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const sectionId = item.dataset.section;
                zoomToSection(sectionId);
            });
        });
    }
    
    // Zoom out to show overview
    function zoomOut() {
        if (isZoomedOut || isAnimating) return;
        
        isAnimating = true;
        isZoomedOut = true;
        
        const zoomWrapper = document.getElementById('zoom-wrapper');
        const zoomOverlay = document.getElementById('zoom-overlay');
        const nav = document.querySelector('.nav-floating');
        
        // Calculate zoom level based on viewport
        const viewportHeight = window.innerHeight;
        const documentHeight = zoomWrapper.scrollHeight;
        const zoomScale = Math.min(0.15, (viewportHeight * 0.8) / documentHeight);
        
        // Apply zoom out transformation
        zoomWrapper.style.transform = `scale(${zoomScale}) translateY(100px)`;
        zoomWrapper.style.transformOrigin = 'center top';
        
        // Show overlay
        zoomOverlay.classList.add('active');
        
        // Hide navigation temporarily
        if (nav) {
            nav.style.opacity = '0';
            nav.style.pointerEvents = 'none';
        }
        
        // Disable scrolling on body
        document.body.style.overflow = 'hidden';
        
        // Add visual effects
        addZoomEffects();
        
        setTimeout(() => {
            isAnimating = false;
        }, 1200);
    }
    
    // Zoom in to normal view
    function zoomIn() {
        if (!isZoomedOut || isAnimating) return;
        
        isAnimating = true;
        isZoomedOut = false;
        
        const zoomWrapper = document.getElementById('zoom-wrapper');
        const zoomOverlay = document.getElementById('zoom-overlay');
        const nav = document.querySelector('.nav-floating');
        
        // Reset transformation
        zoomWrapper.style.transform = 'scale(1) translateY(0)';
        
        // Hide overlay
        zoomOverlay.classList.remove('active');
        
        // Show navigation
        if (nav) {
            nav.style.opacity = '1';
            nav.style.pointerEvents = 'auto';
        }
        
        // Enable scrolling
        document.body.style.overflow = '';
        
        // Remove effects
        removeZoomEffects();
        
        setTimeout(() => {
            isAnimating = false;
        }, 1200);
    }
    
    // Zoom to specific section
    function zoomToSection(sectionId) {
        zoomIn();
        
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1300);
    }
    
    // Add visual effects during zoom
    function addZoomEffects() {
        const zoomWrapper = document.getElementById('zoom-wrapper');
        
        // Add glow effect
        zoomWrapper.style.boxShadow = '0 0 100px rgba(99, 102, 241, 0.3)';
        zoomWrapper.style.border = '2px solid rgba(99, 102, 241, 0.2)';
        zoomWrapper.style.borderRadius = '20px';
        
        // Highlight sections
        const sections = zoomWrapper.querySelectorAll('section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.outline = '1px solid rgba(99, 102, 241, 0.3)';
                section.style.outlineOffset = '10px';
            }, index * 100);
        });
    }
    
    // Remove visual effects
    function removeZoomEffects() {
        const zoomWrapper = document.getElementById('zoom-wrapper');
        
        zoomWrapper.style.boxShadow = '';
        zoomWrapper.style.border = '';
        zoomWrapper.style.borderRadius = '';
        
        const sections = zoomWrapper.querySelectorAll('section');
        sections.forEach(section => {
            section.style.outline = '';
            section.style.outlineOffset = '';
        });
    }
    
    // Scroll event handler
    let lastScrollY = 0;
    let scrollTimer;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        
        // Trigger zoom out on first downward scroll
        if (!hasTriggered && currentScrollY > scrollThreshold && scrollDelta > 0) {
            hasTriggered = true;
            zoomOut();
            
            // Set timer to zoom back in
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                if (isZoomedOut) {
                    zoomIn();
                }
            }, 3000);
        }
        
        // Manual zoom in on continued scroll while zoomed out
        if (isZoomedOut && !isAnimating && scrollDelta > 20) {
            zoomIn();
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events
    let scrollThrottle;
    window.addEventListener('scroll', () => {
        if (!scrollThrottle) {
            scrollThrottle = setTimeout(() => {
                handleScroll();
                scrollThrottle = null;
            }, 100);
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'o' && e.ctrlKey) {
            e.preventDefault();
            if (isZoomedOut) {
                zoomIn();
            } else {
                zoomOut();
            }
        }
        
        if (e.key === 'Escape' && isZoomedOut) {
            zoomIn();
        }
    });
    
    // Initialize
    initZoomEffect();
    
    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        #zoom-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: linear-gradient(135deg, 
                rgba(15, 23, 42, 0.98) 0%, 
                rgba(30, 41, 59, 0.98) 100%);
            z-index: 999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.6s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 3rem;
        }
        
        #zoom-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
        
        .zoom-header {
            text-align: center;
            animation: fadeInDown 0.8s ease;
        }
        
        .zoom-title {
            font-size: 3rem;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
        }
        
        .zoom-subtitle {
            font-size: 1.6rem;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .zoom-navigation {
            display: flex;
            gap: 3rem;
            flex-wrap: wrap;
            justify-content: center;
            animation: fadeInUp 0.8s ease 0.2s both;
        }
        
        .zoom-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .zoom-nav-item:hover {
            background: rgba(99, 102, 241, 0.2);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }
        
        .zoom-nav-item i {
            font-size: 2.5rem;
            color: #667eea;
        }
        
        .zoom-nav-item span {
            font-size: 1.4rem;
            color: white;
            font-weight: 500;
        }
        
        .zoom-hint {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: rgba(255, 255, 255, 0.5);
            font-size: 1.4rem;
            animation: pulse 2s ease infinite;
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
        
        #zoom-wrapper {
            background: var(--dark);
            position: relative;
        }
        
        #zoom-wrapper.zoomed-out {
            cursor: zoom-in;
        }
        
        /* Ensure videos continue playing during zoom */
        #zoom-wrapper video {
            pointer-events: none;
        }
        
        /* Mobile adjustments */
        @media (max-width: 768px) {
            .zoom-navigation {
                gap: 1rem;
            }
            
            .zoom-nav-item {
                padding: 1rem;
            }
            
            .zoom-nav-item i {
                font-size: 2rem;
            }
            
            .zoom-title {
                font-size: 2rem;
            }
        }
    `;
    document.head.appendChild(style);
});