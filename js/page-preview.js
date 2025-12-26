// Page Preview Effect JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const previewContainer = document.getElementById('page-preview');
    const previewClose = document.querySelector('.preview-close');
    const previewSections = document.querySelectorAll('.preview-section');
    
    let hasShownPreview = false;
    let scrollThreshold = 100; // Pixels to scroll before showing preview
    let isPreviewActive = false;
    
    // Create scroll trigger for preview
    function initPreviewEffect() {
        let lastScrollY = 0;
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Only show preview once when first scrolling down
            if (!hasShownPreview && currentScrollY > scrollThreshold && currentScrollY > lastScrollY) {
                showPreview();
                hasShownPreview = true;
                
                // Auto-hide after 3 seconds
                setTimeout(() => {
                    if (isPreviewActive) {
                        hidePreview();
                    }
                }, 3000);
            }
            
            // Hide preview if user continues scrolling while it's open
            if (isPreviewActive && Math.abs(currentScrollY - lastScrollY) > 50) {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    hidePreview();
                }, 300);
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Show preview with animation
    function showPreview() {
        isPreviewActive = true;
        previewContainer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add entrance animation to each section
        previewSections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Add pulse effect to indicate interactivity
        addPulseEffect();
    }
    
    // Hide preview with animation
    function hidePreview() {
        isPreviewActive = false;
        previewContainer.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Reset sections for next time
        previewSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });
    }
    
    // Close button handler
    if (previewClose) {
        previewClose.addEventListener('click', hidePreview);
    }
    
    // Click on preview sections to navigate
    previewSections.forEach((section, index) => {
        section.addEventListener('click', () => {
            const sectionIds = ['#home', '#services', '#about', '#process', '#projects', '#contact'];
            const targetSection = document.querySelector(sectionIds[index]);
            
            if (targetSection) {
                hidePreview();
                
                // Smooth scroll to section after preview closes
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });
    
    // Add hover tooltips to preview sections
    function addSectionTooltips() {
        const tooltips = [
            'Hero Section - Welcome',
            'Our Services',
            'About Us',
            'Our Process',
            'Projects Portfolio',
            'Contact Form'
        ];
        
        previewSections.forEach((section, index) => {
            section.setAttribute('title', tooltips[index]);
            
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'preview-tooltip';
            tooltip.textContent = tooltips[index];
            section.appendChild(tooltip);
        });
    }
    
    // Add pulse effect to draw attention
    function addPulseEffect() {
        const pulseRing = document.createElement('div');
        pulseRing.className = 'preview-pulse-ring';
        pulseRing.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            border: 2px solid rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: pulse-ring 2s ease-out;
            pointer-events: none;
        `;
        
        previewContainer.appendChild(pulseRing);
        
        setTimeout(() => {
            pulseRing.remove();
        }, 2000);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isPreviewActive) {
            if (e.key === 'Escape') {
                hidePreview();
            } else if (e.key >= '1' && e.key <= '6') {
                // Number keys 1-6 navigate to sections
                const index = parseInt(e.key) - 1;
                if (previewSections[index]) {
                    previewSections[index].click();
                }
            }
        }
    });
    
    // Add mini-map dots for navigation
    function createMiniMapDots() {
        const miniMap = document.createElement('div');
        miniMap.className = 'preview-mini-map';
        miniMap.style.cssText = `
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const sectionNames = ['Home', 'Services', 'About', 'Process', 'Projects', 'Contact'];
        
        sectionNames.forEach((name, index) => {
            const dot = document.createElement('div');
            dot.className = 'mini-map-dot';
            dot.setAttribute('data-section', name);
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            `;
            
            // Add label on hover
            const label = document.createElement('span');
            label.textContent = name;
            label.style.cssText = `
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(15, 23, 42, 0.9);
                padding: 5px 10px;
                border-radius: 5px;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
                font-size: 12px;
                color: white;
            `;
            
            dot.appendChild(label);
            
            dot.addEventListener('mouseenter', () => {
                label.style.opacity = '1';
                dot.style.background = '#667eea';
                dot.style.transform = 'scale(1.5)';
            });
            
            dot.addEventListener('mouseleave', () => {
                label.style.opacity = '0';
                dot.style.background = 'rgba(255, 255, 255, 0.3)';
                dot.style.transform = 'scale(1)';
            });
            
            dot.addEventListener('click', () => {
                if (previewSections[index]) {
                    previewSections[index].click();
                }
            });
            
            miniMap.appendChild(dot);
        });
        
        previewContainer.appendChild(miniMap);
        
        // Show mini-map when preview is active
        const observer = new MutationObserver(() => {
            if (previewContainer.classList.contains('active')) {
                setTimeout(() => {
                    miniMap.style.opacity = '1';
                }, 500);
            } else {
                miniMap.style.opacity = '0';
            }
        });
        
        observer.observe(previewContainer, { attributes: true, attributeFilter: ['class'] });
    }
    
    // CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-ring {
            0% {
                width: 100px;
                height: 100px;
                opacity: 1;
            }
            100% {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
        
        .preview-tooltip {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(15, 23, 42, 0.9);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 1.2rem;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 10;
        }
        
        .preview-section:hover .preview-tooltip {
            opacity: 1;
        }
        
        /* Smooth section transitions */
        .preview-section {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize everything
    initPreviewEffect();
    addSectionTooltips();
    createMiniMapDots();
    
    // Optional: Show preview on page load for demo
    // Uncomment the next lines to auto-show preview after 2 seconds
    /*
    setTimeout(() => {
        if (!hasShownPreview) {
            showPreview();
            hasShownPreview = true;
            setTimeout(hidePreview, 3000);
        }
    }, 2000);
    */
});