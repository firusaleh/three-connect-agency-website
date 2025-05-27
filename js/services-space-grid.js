// Space Grid Services - Clean Animations
document.addEventListener('DOMContentLoaded', function() {
    const servicesSection = document.querySelector('.services-2025');
    if (!servicesSection) return;
    
    // Create stars background
    function createStars() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';
        servicesSection.appendChild(starsContainer);
        
        // Create 150 stars
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            
            // Random size (1-3px)
            const size = 1 + Math.random() * 2;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            
            // Random animation delay
            star.style.animationDelay = Math.random() * 3 + 's';
            
            starsContainer.appendChild(star);
        }
    }
    
    // Initialize space elements
    createStars();
    
    // Service cards hover effects
    const serviceBlocks = document.querySelectorAll('.service-block');
    
    serviceBlocks.forEach((block, index) => {
        // Add subtle tilt on mouse move
        block.addEventListener('mousemove', function(e) {
            if (window.innerWidth <= 768) return;
            
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;
            
            this.style.transform = `translateY(-10px) scale(1.02) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Shooting stars effect
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            box-shadow: 0 0 10px 2px white;
            top: ${Math.random() * 50}%;
            left: -10px;
            z-index: 5;
        `;
        
        servicesSection.appendChild(star);
        
        // Create tail
        const tail = document.createElement('div');
        tail.style.cssText = `
            position: absolute;
            top: 0;
            left: -100px;
            width: 100px;
            height: 1px;
            background: linear-gradient(90deg, transparent, white);
            opacity: 0.6;
        `;
        star.appendChild(tail);
        
        // Animate across screen
        const duration = 1500 + Math.random() * 1000;
        star.animate([
            { transform: 'translateX(0) translateY(0)', opacity: 1 },
            { transform: `translateX(${window.innerWidth + 200}px) translateY(${Math.random() * 100}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => star.remove();
    }
    
    // Create shooting stars periodically
    setInterval(createShootingStar, 4000);
    
    // Intersection Observer for fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
                
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    serviceBlocks.forEach(block => {
        fadeInObserver.observe(block);
    });
    
    // CTA Button effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Create ripple
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            ripple.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(4)', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => ripple.remove();
        });
    }
    
    // Add nebula drift
    function createNebula() {
        const nebula = document.createElement('div');
        nebula.style.cssText = `
            position: absolute;
            width: ${200 + Math.random() * 200}px;
            height: ${200 + Math.random() * 200}px;
            background: radial-gradient(circle, 
                rgba(${100 + Math.random() * 100}, ${50 + Math.random() * 100}, ${150 + Math.random() * 105}, 0.1) 0%, 
                transparent 70%);
            border-radius: 50%;
            filter: blur(40px);
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.5;
        `;
        
        servicesSection.appendChild(nebula);
        
        // Animate drift
        nebula.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 0.3 },
            { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2)`, opacity: 0.5 },
            { transform: 'translate(0, 0) scale(1)', opacity: 0.3 }
        ], {
            duration: 30000 + Math.random() * 20000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }
    
    // Create 3 nebulae
    for (let i = 0; i < 3; i++) {
        createNebula();
    }
});

// Add required CSS
const style = document.createElement('style');
style.textContent = `
    .service-block {
        transform-style: preserve-3d;
        perspective: 1000px;
    }
    
    .shooting-star {
        pointer-events: none;
    }
`;
document.head.appendChild(style);