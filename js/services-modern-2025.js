// Modern Services Section Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    // Add data attributes to service blocks
    const serviceBlocks = document.querySelectorAll('.service-block');
    const serviceTypes = ['sdr', 'lead', 'web', 'crm'];
    
    serviceBlocks.forEach((block, index) => {
        block.setAttribute('data-service', serviceTypes[index]);
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for service features
                const features = entry.target.querySelectorAll('.service-features li');
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.opacity = '1';
                        feature.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all service blocks
    serviceBlocks.forEach(block => {
        fadeInObserver.observe(block);
    });
    
    // Interactive hover effects
    serviceBlocks.forEach(block => {
        const icon = block.querySelector('.service-icon-3d');
        const link = block.querySelector('.service-link');
        
        // 3D tilt effect on hover
        block.addEventListener('mousemove', (e) => {
            const rect = block.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            block.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        block.addEventListener('mouseleave', () => {
            block.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
        
        // Magnetic button effect
        if (link) {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                link.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translate(0, 0)';
            });
        }
    });
    
    // Parallax effect for service icons
    let ticking = false;
    function updateParallax() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const icons = document.querySelectorAll('.service-icon-3d');
                
                icons.forEach((icon, index) => {
                    const speed = 0.5 + (index * 0.1);
                    const yPos = -(scrolled * speed);
                    icon.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateParallax);
    
    // Counter animation for statistics
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    };
    
    // Check for conversion rate element and animate
    const conversionRate = document.querySelector('.service-features li:contains("25%")');
    if (conversionRate) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target, 25);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(conversionRate);
    }
    
    // Add ripple effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
    
    // Service card click animation
    serviceBlocks.forEach(block => {
        block.addEventListener('click', function(e) {
            // Don't trigger if clicking on link
            if (e.target.closest('.service-link')) return;
            
            // Add pulse effect
            this.classList.add('pulse');
            setTimeout(() => this.classList.remove('pulse'), 600);
        });
    });
});

// Add required CSS for animations
const style = document.createElement('style');
style.textContent = `
    .service-block {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .service-block.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .service-features li {
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.4s ease;
    }
    
    .service-block.pulse {
        animation: pulse 0.6s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cta-button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);