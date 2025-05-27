// Premium Services Section Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize service blocks
    const serviceBlocks = document.querySelectorAll('.service-block');
    
    // Add smooth hover animations
    serviceBlocks.forEach(block => {
        // Add hover class for enhanced animations
        block.addEventListener('mouseenter', function() {
            this.classList.add('is-hovered');
        });
        
        block.addEventListener('mouseleave', function() {
            this.classList.remove('is-hovered');
        });
        
        // Add click interaction for mobile
        block.addEventListener('click', function(e) {
            // Don't trigger if clicking on link
            if (e.target.closest('.service-link')) return;
            
            // Toggle active state on mobile
            if (window.innerWidth <= 768) {
                serviceBlocks.forEach(b => b.classList.remove('is-active'));
                this.classList.add('is-active');
            }
        });
    });
    
    // Parallax effect for service icons
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const icons = document.querySelectorAll('.service-icon-3d');
            
            icons.forEach((icon, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed * 0.1);
                icon.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                
                // Animate features list items
                const features = entry.target.querySelectorAll('.service-features li');
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.classList.add('feature-visible');
                    }, index * 100);
                });
                
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all service blocks
    serviceBlocks.forEach(block => {
        block.classList.add('fade-in-element');
        fadeInObserver.observe(block);
    });
    
    // CTA button ripple effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('button-ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
    
    // Service links magnetic effect
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(link => {
        link.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // Add performance optimizations
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateElements);
            ticking = true;
        }
    }
    
    function updateElements() {
        ticking = false;
    }
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            requestTick();
        });
    });
});

// Add required CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .fade-in-element {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .fade-in-visible {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-features li {
        opacity: 0;
        transform: translateX(-20px);
    }
    
    .service-features li.feature-visible {
        animation: slideInRight 0.5s ease forwards;
    }
    
    @keyframes slideInRight {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .button-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .service-link {
        position: relative;
        overflow: hidden;
        transition: transform 0.2s ease;
    }
    
    .service-block.is-active {
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
        transform: translateX(5px);
    }
    
    @media (max-width: 768px) {
        .service-block {
            transition: all 0.3s ease;
        }
    }
`;
document.head.appendChild(animationStyles);