// Services Section Interactive Features

// Service Cards Interaction
class ServiceCardsInteraction {
    constructor() {
        this.cards = document.querySelectorAll('.service-block');
        this.progressDots = [];
        this.currentCard = 0;
        this.init();
    }
    
    init() {
        this.createProgressIndicator();
        this.setupCardInteractions();
        this.setupIntersectionObserver();
        this.setupParallax();
    }
    
    createProgressIndicator() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'services-progress';
        
        this.cards.forEach((card, index) => {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            dot.setAttribute('data-index', index);
            
            dot.addEventListener('click', () => {
                this.scrollToCard(index);
            });
            
            this.progressDots.push(dot);
            progressContainer.appendChild(dot);
        });
        
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.appendChild(progressContainer);
        }
    }
    
    scrollToCard(index) {
        this.cards[index].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
    
    setupCardInteractions() {
        this.cards.forEach((card, index) => {
            // Click to expand details
            card.addEventListener('click', (e) => {
                // Don't expand if clicking on links
                if (e.target.tagName === 'A' || e.target.closest('a')) return;
                
                card.classList.toggle('expanded');
            });
            
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                this.addConnectionLines(index);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeConnectionLines();
            });
        });
    }
    
    addConnectionLines(index) {
        // Add subtle connection lines between related services
        const connections = [
            [0, 1], // SDR to Lead Gen
            [1, 2], // Lead Gen to Website
            [2, 3], // Website to CRM
            [0, 3]  // SDR to CRM
        ];
        
        connections.forEach(([from, to]) => {
            if (from === index || to === index) {
                this.createConnectionLine(from, to);
            }
        });
    }
    
    createConnectionLine(from, to) {
        const fromCard = this.cards[from];
        const toCard = this.cards[to];
        
        if (!fromCard || !toCard) return;
        
        const line = document.createElement('div');
        line.className = 'service-connection';
        
        const fromRect = fromCard.getBoundingClientRect();
        const toRect = toCard.getBoundingClientRect();
        const containerRect = fromCard.parentElement.getBoundingClientRect();
        
        const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
        const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
        const x2 = toRect.left + toRect.width / 2 - containerRect.left;
        const y2 = toRect.top + toRect.height / 2 - containerRect.top;
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        line.style.width = `${length}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 50%';
        
        fromCard.parentElement.appendChild(line);
    }
    
    removeConnectionLines() {
        const lines = document.querySelectorAll('.service-connection');
        lines.forEach(line => line.remove());
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const index = Array.from(this.cards).indexOf(entry.target);
                
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    this.updateProgressIndicator(index);
                }
            });
        }, observerOptions);
        
        this.cards.forEach(card => observer.observe(card));
    }
    
    updateProgressIndicator(index) {
        this.progressDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            this.cards.forEach((card, index) => {
                const speed = 0.05 * (index + 1);
                const yPos = -(scrolled * speed);
                card.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Feature List Animations
class FeatureListAnimation {
    constructor() {
        this.features = document.querySelectorAll('.service-features li');
        this.init();
    }
    
    init() {
        this.features.forEach((feature, index) => {
            feature.style.transitionDelay = `${index * 0.1}s`;
            
            feature.addEventListener('mouseenter', () => {
                this.animateIcon(feature);
            });
        });
    }
    
    animateIcon(feature) {
        const icon = feature.querySelector('i');
        if (icon) {
            icon.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0) scale(1)';
            }, 500);
        }
    }
}

// CTA Section Enhancement
class CTAEnhancement {
    constructor() {
        this.ctaSection = document.querySelector('.services-cta-section');
        if (!this.ctaSection) return;
        
        this.init();
    }
    
    init() {
        this.addTrustElements();
        this.setupHoverEffects();
    }
    
    addTrustElements() {
        const trustHTML = `
            <div class="trust-elements">
                <div class="trust-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>100% Vertraulich</span>
                </div>
                <div class="trust-item">
                    <i class="fas fa-award"></i>
                    <span>Garantierte Qualität</span>
                </div>
                <div class="trust-item">
                    <i class="fas fa-headset"></i>
                    <span>24/7 Support</span>
                </div>
            </div>
        `;
        
        const ctaContent = this.ctaSection.querySelector('.cta-content');
        if (ctaContent) {
            ctaContent.insertAdjacentHTML('beforeend', trustHTML);
        }
    }
    
    setupHoverEffects() {
        const ctaButton = this.ctaSection.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('mouseenter', () => {
                this.createRipple(ctaButton);
            });
        }
    }
    
    createRipple(button) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
    }
}

// Mobile Swipe for Service Cards
class MobileSwipe {
    constructor() {
        this.container = document.querySelector('.services-showcase');
        if (!this.container) return;
        
        this.init();
    }
    
    init() {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        this.container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - this.container.offsetLeft;
            scrollLeft = this.container.scrollLeft;
        });
        
        this.container.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        this.container.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        this.container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - this.container.offsetLeft;
            const walk = (x - startX) * 2;
            this.container.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            
            const touchEndX = e.touches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            this.container.scrollLeft += diff;
            touchStartX = touchEndX;
        });
        
        this.container.addEventListener('touchend', () => {
            touchStartX = 0;
        });
    }
}

// Add Ripple CSS
const rippleStyles = `
    .ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        animation: ripple-animation 1s ease-out;
    }
    
    @keyframes ripple-animation {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    .service-block.expanded {
        grid-column: span 12 !important;
        z-index: 10;
    }
    
    .service-block.expanded .service-description {
        max-height: none;
    }
    
    .service-block.expanded .service-features {
        max-height: none;
    }
`;

// Add styles
const styleEl = document.createElement('style');
styleEl.textContent = rippleStyles;
document.head.appendChild(styleEl);

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    new ServiceCardsInteraction();
    new FeatureListAnimation();
    new CTAEnhancement();
    new MobileSwipe();
});