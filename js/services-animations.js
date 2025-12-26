// Modern Services Animation Effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize service cards animations
    initServiceCards();
    initParallaxEffect();
    initHoverEffects();
    initScrollAnimations();
});

// Service Cards Initialization
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-modern-card');
    
    serviceCards.forEach((card, index) => {
        // Add stagger animation on load
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
        
        // Add click handler for modal/detail view
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('service-modern-cta')) {
                handleServiceClick(card.dataset.service);
            }
        });
    });
}

// Parallax Effect for Icons
function initParallaxEffect() {
    const iconContainers = document.querySelectorAll('.service-icon-container');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        iconContainers.forEach(container => {
            const rect = container.getBoundingClientRect();
            const containerCenterX = rect.left + rect.width / 2;
            const containerCenterY = rect.top + rect.height / 2;
            
            const deltaX = (mouseX - containerCenterX) / windowWidth;
            const deltaY = (mouseY - containerCenterY) / windowHeight;
            
            const rotateX = deltaY * 10;
            const rotateY = deltaX * 10;
            
            container.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// Enhanced Hover Effects
function initHoverEffects() {
    const cards = document.querySelectorAll('.service-modern-card');
    
    cards.forEach(card => {
        let bounds;
        
        function rotateToMouse(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            };
            const distance = Math.sqrt(center.x**2 + center.y**2);
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${center.y / 10}deg)
                rotateY(${-center.x / 10}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
            
            // Move glow effect
            const glowX = (leftX / bounds.width) * 100;
            const glowY = (topY / bounds.height) * 100;
            card.style.background = `
                radial-gradient(
                    circle at ${glowX}% ${glowY}%,
                    rgba(0, 255, 255, 0.1) 0%,
                    rgba(255, 255, 255, 0.05) 25%,
                    rgba(255, 255, 255, 0.02) 50%,
                    transparent 100%
                ),
                linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)
            `;
        }
        
        card.addEventListener('mouseenter', function() {
            bounds = this.getBoundingClientRect();
            document.addEventListener('mousemove', rotateToMouse);
            
            // Animate feature pills
            const pills = this.querySelectorAll('.feature-pill');
            pills.forEach((pill, index) => {
                setTimeout(() => {
                    pill.style.transform = 'scale(1.1) translateY(-2px)';
                }, 50 * index);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            document.removeEventListener('mousemove', rotateToMouse);
            this.style.transform = '';
            this.style.background = '';
            
            // Reset feature pills
            const pills = this.querySelectorAll('.feature-pill');
            pills.forEach(pill => {
                pill.style.transform = '';
            });
        });
    });
}

// Scroll-triggered Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                
                // Animate icon rings
                const rings = card.querySelectorAll('.service-icon-ring');
                rings.forEach((ring, index) => {
                    ring.style.animationPlayState = 'running';
                });
                
                // Animate price counter
                const priceElement = card.querySelector('.price-amount');
                if (priceElement && !priceElement.dataset.animated) {
                    animatePrice(priceElement);
                    priceElement.dataset.animated = 'true';
                }
                
                // Add pulse effect to CTA button
                const ctaButton = card.querySelector('.service-modern-cta');
                if (ctaButton) {
                    setTimeout(() => {
                        ctaButton.classList.add('pulse');
                        setTimeout(() => ctaButton.classList.remove('pulse'), 1000);
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-modern-card').forEach(card => {
        observer.observe(card);
    });
}

// Animate price counter
function animatePrice(element) {
    const finalPrice = element.textContent;
    const numericPrice = parseInt(finalPrice.replace(/[^\d]/g, ''));
    const currency = finalPrice.match(/[^\d\s]/)[0];
    let currentPrice = 0;
    const increment = numericPrice / 30;
    const timer = setInterval(() => {
        currentPrice += increment;
        if (currentPrice >= numericPrice) {
            currentPrice = numericPrice;
            clearInterval(timer);
        }
        element.textContent = currency + Math.floor(currentPrice).toLocaleString('de-DE');
    }, 30);
}

// Handle service click for detail modal
function handleServiceClick(serviceType) {
    console.log('Service clicked:', serviceType);
    // Scroll to contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Pre-fill message in contact form
        setTimeout(() => {
            const messageField = document.querySelector('#message');
            if (messageField) {
                const serviceNames = {
                    'website': 'Website-Erstellung',
                    'landing': 'Landing Pages',
                    'seo': 'SEO-Optimierung',
                    'sdr': 'SDR-Coldcalling',
                    'crm': 'CRM-Einrichtung',
                    'software': 'Software-Entwicklung'
                };
                messageField.value = `Ich interessiere mich für: ${serviceNames[serviceType]}`;
                messageField.focus();
            }
        }, 1000);
    }
}

// Add CSS animation classes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.7);
        }
        70% {
            box-shadow: 0 0 0 20px rgba(0, 255, 255, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(0, 255, 255, 0);
        }
    }
    
    .service-modern-cta.pulse {
        animation: pulse 1s;
    }
`;
document.head.appendChild(style);