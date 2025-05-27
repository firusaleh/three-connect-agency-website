// Space Floating Services - Interactive 3D Effects
document.addEventListener('DOMContentLoaded', function() {
    const servicesSection = document.querySelector('.services-2025');
    if (!servicesSection) return;
    
    // Create stars background
    function createStars() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';
        servicesSection.appendChild(starsContainer);
        
        // Create 200 stars
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 3;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            
            // Random animation delay
            star.style.animationDelay = Math.random() * 3 + 's';
            
            starsContainer.appendChild(star);
        }
    }
    
    // Create orbit rings
    function createOrbitRings() {
        const showcase = document.querySelector('.services-showcase');
        if (!showcase) return;
        
        for (let i = 0; i < 2; i++) {
            const ring = document.createElement('div');
            ring.className = 'orbit-ring';
            showcase.appendChild(ring);
        }
    }
    
    // Initialize space elements
    createStars();
    createOrbitRings();
    
    // 3D Mouse tracking
    const showcase = document.querySelector('.services-showcase');
    if (showcase && window.innerWidth > 1024) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        
        servicesSection.addEventListener('mousemove', (e) => {
            const rect = servicesSection.getBoundingClientRect();
            mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
            mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
        });
        
        // Smooth animation loop
        function animate() {
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;
            
            const rotateX = currentY * 10;
            const rotateY = currentX * 10;
            
            showcase.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
            
            requestAnimationFrame(animate);
        }
        animate();
    }
    
    // Service cards interactions
    const serviceBlocks = document.querySelectorAll('.service-block');
    
    serviceBlocks.forEach((block, index) => {
        // Add glow effect on hover
        block.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
        
        // Parallax effect for individual cards
        block.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const tiltX = (y - 0.5) * 20;
            const tiltY = (x - 0.5) * -20;
            
            this.style.transform = `
                translateZ(${this.style.transform.includes('200px') ? '200px' : '100px'}) 
                rotateX(${tiltX}deg) 
                rotateY(${tiltY}deg)
                scale(${this.matches(':hover') ? '1.1' : '1'})
            `;
        });
        
        block.addEventListener('mouseleave', function() {
            // Reset to original animation
            const animations = ['float1', 'float2', 'float3', 'float4'];
            this.style.animation = `${animations[index]} ${20 + index * 5}s ease-in-out infinite`;
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
            box-shadow: 0 0 10px white;
            top: ${Math.random() * 50}%;
            left: -10px;
            z-index: 5;
        `;
        
        servicesSection.appendChild(star);
        
        // Animate across screen
        const duration = 2000 + Math.random() * 1000;
        star.animate([
            { transform: 'translateX(0) translateY(0)', opacity: 1 },
            { transform: `translateX(${window.innerWidth + 100}px) translateY(${Math.random() * 200}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => star.remove();
    }
    
    // Create shooting stars periodically
    setInterval(createShootingStar, 3000);
    
    // Intersection Observer for fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateZ(-100px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    
                    // Start floating animation
                    const animations = ['float1', 'float2', 'float3', 'float4'];
                    const index = Array.from(serviceBlocks).indexOf(entry.target);
                    entry.target.style.animation = `${animations[index]} ${20 + index * 5}s ease-in-out infinite`;
                }, index * 200);
                
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    serviceBlocks.forEach(block => {
        fadeInObserver.observe(block);
    });
    
    // CTA Button quantum effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });
    }
    
    // Create nebula particles
    function createNebulaParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            background: radial-gradient(circle, 
                rgba(${Math.random() * 100 + 100}, ${Math.random() * 100}, ${Math.random() * 100 + 155}, 0.1) 0%, 
                transparent 70%);
            border-radius: 50%;
            filter: blur(20px);
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: drift ${20 + Math.random() * 20}s ease-in-out infinite;
            pointer-events: none;
            z-index: 1;
        `;
        
        servicesSection.appendChild(particle);
    }
    
    // Create multiple nebula particles
    for (let i = 0; i < 5; i++) {
        createNebulaParticle();
    }
    
    // Mobile touch interactions
    if (window.innerWidth <= 1024) {
        serviceBlocks.forEach(block => {
            block.addEventListener('touchstart', function() {
                this.classList.add('touched');
            });
            
            block.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touched');
                }, 300);
            });
        });
    }
});

// Add required CSS for additional effects
const spaceStyles = document.createElement('style');
spaceStyles.textContent = `
    @keyframes drift {
        0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% { 
            transform: translate(50px, -50px) scale(1.2);
            opacity: 0.5;
        }
        50% { 
            transform: translate(-30px, 30px) scale(0.8);
            opacity: 0.3;
        }
        75% { 
            transform: translate(30px, 50px) scale(1.1);
            opacity: 0.4;
        }
    }
    
    .shooting-star::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 1px;
        background: linear-gradient(90deg, white, transparent);
        transform: translateX(-100%);
    }
    
    .service-block.touched {
        transform: translateZ(150px) scale(1.05) !important;
    }
    
    .cta-button::after {
        content: '';
        position: absolute;
        top: var(--y, 50%);
        left: var(--x, 50%);
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s ease, height 0.6s ease;
        pointer-events: none;
    }
    
    .cta-button:hover::after {
        width: 200px;
        height: 200px;
    }
    
    /* Ensure text is fully visible */
    .service-description,
    .service-features li {
        opacity: 1 !important;
        visibility: visible !important;
    }
`;
document.head.appendChild(spaceStyles);