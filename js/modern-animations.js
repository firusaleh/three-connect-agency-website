// Complete Modern Animations for Three Connect
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initScrollAnimations();
    initInteractiveElements();
    initParallaxEffects();
    initFormAnimations();
    initCounterAnimations();
    initNavigationEffects();
});

// Initialize all animations
function initializeAnimations() {
    // Fade in elements on load
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for child elements
                const children = entry.target.querySelectorAll('.stagger-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => observer.observe(element));
}

// Scroll-based animations
function initScrollAnimations() {
    // Progress bars animation
    const progressBars = document.querySelectorAll('.progress-fill-modern');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const width = entry.target.style.width || entry.target.dataset.progress;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item-modern');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => timelineObserver.observe(item));
}

// Interactive hover effects
function initInteractiveElements() {
    // 3D card tilt effect
    const cards = document.querySelectorAll('.service-modern-card, .project-card-modern, .value-card-modern, .stat-card-modern');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Magnetic button effect
    const buttons = document.querySelectorAll('.btn-modern-primary, .btn-modern-secondary, .nav-cta-modern, .form-submit-modern');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Parallax scrolling effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-badge-modern, .stat-card-modern, .value-icon-modern');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Form animations
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-input-modern, .form-textarea-modern');
    
    formInputs.forEach(input => {
        // Floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Ripple effect on focus
        input.addEventListener('focus', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'input-ripple';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            this.parentElement.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number-modern');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                const target = parseInt(entry.target.textContent);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                        entry.target.dataset.counted = 'true';
                    }
                };
                
                updateCounter();
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Navigation scroll effects
function initNavigationEffects() {
    const nav = document.querySelector('.nav-modern');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 100) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
        
        // Hide/show on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav?.style.transform = 'translateY(-100%)';
        } else {
            nav?.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mouse trail effect
function initMouseTrail() {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    document.body.appendChild(trail);
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        const speed = 0.1;
        
        trailX += (mouseX - trailX) * speed;
        trailY += (mouseY - trailY) * speed;
        
        trail.style.transform = `translate(${trailX}px, ${trailY}px)`;
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Particle background effect
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Add dynamic styles
const style = document.createElement('style');
style.textContent = `
    .input-ripple {
        position: absolute;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        background: rgba(0, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        animation: ripple-expand 1s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-expand {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    .mouse-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0, 255, 255, 0.3), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
    }
    
    .particles-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }
    
    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--primary-cyan);
        border-radius: 50%;
        animation: particle-float linear infinite;
    }
    
    @keyframes particle-float {
        from {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .stagger-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    }
`;
document.head.appendChild(style);

// Initialize advanced effects (optional - can be enabled based on performance)
if (window.innerWidth > 768) {
    // initMouseTrail();
    // initParticles();
}