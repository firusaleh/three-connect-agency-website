// Ultra Modern Services Section - Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    // Add service numbers to cards
    const serviceBlocks = document.querySelectorAll('.service-block');
    serviceBlocks.forEach((block, index) => {
        // Add number badge
        const numberBadge = document.createElement('div');
        numberBadge.className = 'service-number';
        numberBadge.textContent = String(index + 1).padStart(2, '0');
        block.appendChild(numberBadge);
        
        // Add icon wrapper for better structure
        const icon = block.querySelector('.service-visual .service-icon-3d');
        if (icon) {
            const wrapper = document.createElement('div');
            wrapper.className = 'service-icon-wrapper';
            icon.parentNode.insertBefore(wrapper, icon);
            wrapper.appendChild(icon);
        }
    });
    
    // Mouse tracking for gradient effect
    serviceBlocks.forEach(block => {
        block.addEventListener('mousemove', (e) => {
            const rect = block.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            block.style.setProperty('--x', `${x}%`);
            block.style.setProperty('--y', `${y}%`);
        });
        
        // Reset on mouse leave
        block.addEventListener('mouseleave', () => {
            block.style.setProperty('--x', '50%');
            block.style.setProperty('--y', '50%');
        });
    });
    
    // Parallax effect on scroll
    const parallaxElements = document.querySelectorAll('.service-icon-3d');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed * 0.05);
            const rotation = scrolled * speed * 0.02;
            
            element.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                // Animate features
                const features = entry.target.querySelectorAll('.service-features li');
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.opacity = '0';
                        feature.style.transform = 'translateX(-20px)';
                        
                        setTimeout(() => {
                            feature.style.transition = 'all 0.5s ease';
                            feature.style.opacity = '1';
                            feature.style.transform = 'translateX(0)';
                        }, 50);
                    }, index * 100);
                });
                
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    serviceBlocks.forEach(block => {
        fadeInObserver.observe(block);
    });
    
    // CTA Button ripple effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleAnimation 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
    
    // Service card click to expand (mobile)
    serviceBlocks.forEach((block, index) => {
        block.addEventListener('click', function(e) {
            if (e.target.closest('.service-link')) return;
            
            if (window.innerWidth <= 768) {
                this.classList.toggle('expanded');
                
                // Close other expanded cards
                serviceBlocks.forEach((otherBlock, otherIndex) => {
                    if (otherIndex !== index) {
                        otherBlock.classList.remove('expanded');
                    }
                });
            }
        });
    });
    
    // Typing effect for section title
    const sectionTitle = document.querySelector('.services-2025 .section-title');
    if (sectionTitle && !sectionTitle.classList.contains('typed')) {
        const originalText = sectionTitle.innerHTML;
        sectionTitle.innerHTML = '';
        sectionTitle.classList.add('typed');
        
        // Create a temporary element to parse HTML
        const temp = document.createElement('div');
        temp.innerHTML = originalText;
        
        // Extract text content while preserving structure
        const textNodes = [];
        temp.childNodes.forEach(node => {
            if (node.nodeType === 3) { // Text node
                textNodes.push({ type: 'text', content: node.textContent });
            } else if (node.nodeName === 'BR') {
                textNodes.push({ type: 'br' });
            } else if (node.nodeName === 'SPAN') {
                textNodes.push({ type: 'span', content: node.textContent, class: node.className });
            }
        });
        
        // Animate typing
        let currentNodeIndex = 0;
        let currentCharIndex = 0;
        
        function typeNextChar() {
            if (currentNodeIndex >= textNodes.length) return;
            
            const currentNode = textNodes[currentNodeIndex];
            
            if (currentNode.type === 'br') {
                sectionTitle.appendChild(document.createElement('br'));
                currentNodeIndex++;
                setTimeout(typeNextChar, 100);
            } else if (currentNode.type === 'text' || currentNode.type === 'span') {
                if (currentCharIndex === 0 && currentNode.type === 'span') {
                    const span = document.createElement('span');
                    span.className = currentNode.class;
                    sectionTitle.appendChild(span);
                }
                
                const targetElement = currentNode.type === 'span' 
                    ? sectionTitle.lastElementChild 
                    : sectionTitle;
                
                if (currentCharIndex < currentNode.content.length) {
                    targetElement.innerHTML += currentNode.content[currentCharIndex];
                    currentCharIndex++;
                    setTimeout(typeNextChar, 30);
                } else {
                    currentNodeIndex++;
                    currentCharIndex = 0;
                    setTimeout(typeNextChar, 50);
                }
            }
        }
        
        // Start typing when section is in view
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeNextChar, 500);
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        titleObserver.observe(sectionTitle);
    }
});

// Add required CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .service-block.expanded {
        grid-column: span 1 !important;
        min-height: auto;
    }
    
    .service-block.expanded .service-description {
        max-height: none;
    }
    
    .service-block.expanded .service-features {
        max-height: none;
    }
    
    .service-block {
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .service-description {
            max-height: 100px;
            overflow: hidden;
            transition: max-height 0.5s ease;
        }
        
        .service-features {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease;
        }
        
        .service-block.expanded .service-description {
            max-height: 500px;
        }
        
        .service-block.expanded .service-features {
            max-height: 500px;
        }
    }
`;
document.head.appendChild(style);