// Services Section - Harmonized Interactions

// Simple fade-in animation on scroll
class ServicesAnimation {
    constructor() {
        this.elements = document.querySelectorAll('.services-2025 .fade-in-up');
        this.init();
    }
    
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Smooth hover effects for service blocks
class ServiceHoverEffects {
    constructor() {
        this.blocks = document.querySelectorAll('.service-block');
        this.init();
    }
    
    init() {
        this.blocks.forEach((block, index) => {
            // Add staggered animation delay
            block.style.transitionDelay = `${index * 0.1}s`;
            
            // Add magnetic effect to CTA links
            const link = block.querySelector('.service-link');
            if (link) {
                link.addEventListener('mousemove', (e) => {
                    const rect = link.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    link.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
                });
                
                link.addEventListener('mouseleave', () => {
                    link.style.transform = 'translate(0, 0)';
                });
            }
        });
    }
}

// CTA Button ripple effect (matching existing buttons)
class CTARippleEffect {
    constructor() {
        this.button = document.querySelector('.services-cta-section .cta-button');
        if (!this.button) return;
        
        this.init();
    }
    
    init() {
        this.button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = this.button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: translate(${x}px, ${y}px);
                pointer-events: none;
                animation: ripple-animation 0.6s ease-out;
            `;
            
            this.button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
}

// Add ripple animation CSS
const rippleCSS = `
    @keyframes ripple-animation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .services-cta-section .cta-button {
        position: relative;
        overflow: hidden;
    }
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ServicesAnimation();
    new ServiceHoverEffects();
    new CTARippleEffect();
});