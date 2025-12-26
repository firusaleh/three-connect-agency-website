// Main JavaScript for New Design

document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    let progress = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.style.overflow = 'visible';
                initAnimations();
            }, 500);
        }
        loadingProgress.style.width = `${progress}%`;
    }, 100);
    
    // Initialize all animations after loading
    function initAnimations() {
        // Trigger entrance animations
        const fadeElements = document.querySelectorAll('.fade-in-up');
        fadeElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            navCta.classList.toggle('mobile-active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn-3d');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // Early Access Form
    const earlyAccessForm = document.getElementById('earlyAccessForm');
    if (earlyAccessForm) {
        earlyAccessForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = earlyAccessForm.querySelector('input[type="email"]').value;
            alert(`Thank you! We'll notify ${email} when our platforms launch.`);
            earlyAccessForm.reset();
        });
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;
        
        function typeText() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 50);
            }
        }
        
        setTimeout(typeText, 1000);
    }
    
    // Smooth reveal for sections
    const revealElements = document.querySelectorAll('.section-header, .service-card-3d, .project-card-3d');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple-effect {
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
        
        .revealed {
            animation: revealAnimation 0.8s ease-out forwards;
        }
        
        @keyframes revealAnimation {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .mobile-active {
            display: flex !important;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translateY(8px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translateY(-8px);
        }
        
        button {
            position: relative;
            overflow: hidden;
        }
        
        .word-reveal {
            display: inline-block;
            transform-style: preserve-3d;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize video playback
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.play().catch(err => {
            console.log('Video autoplay failed:', err);
        });
    });
    
    // Performance optimization - lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Console Easter Egg
    console.log('%c Three Connect ', 
        'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 20px; font-weight: bold; border-radius: 5px;');
    console.log('%c Founded 2025 • 10 Years Experience', 
        'color: #667eea; font-size: 14px; font-style: italic;');
});

// Prevent right-click on images
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});