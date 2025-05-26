// Subtle Animations and Enhancements

// Fade-in on Scroll
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in, [data-scroll]');
        this.init();
    }
    
    init() {
        // Initial check
        this.checkElements();
        
        // Check on scroll (throttled)
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.checkElements();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    checkElements() {
        this.elements.forEach(element => {
            if (this.isInViewport(element)) {
                element.classList.add('visible', 'in-view');
            }
        });
    }
    
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
}

// Subtle Parallax Effect
class SubtleParallax {
    constructor() {
        this.elements = document.querySelectorAll('.parallax-subtle');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.updateParallax();
        });
    }
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Sticky CTA Button
class StickyCTA {
    constructor() {
        this.cta = document.querySelector('.sticky-cta');
        if (!this.cta) {
            this.createStickyCTA();
        }
        this.init();
    }
    
    createStickyCTA() {
        const ctaHTML = `
            <div class="sticky-cta">
                <a href="#contact" class="sticky-cta-button">
                    <span>Beratung starten</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px;">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', ctaHTML);
        this.cta = document.querySelector('.sticky-cta');
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.cta.classList.add('show');
            } else {
                this.cta.classList.remove('show');
            }
        });
    }
}

// Enhanced Image Loading
class ImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img');
        this.init();
    }
    
    init() {
        this.images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    }
}

// Smooth Anchor Scrolling
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offset = 80; // Account for fixed header
                    const targetPosition = targetElement.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Trust Badge Animation
class TrustBadgeAnimator {
    constructor() {
        this.badges = document.querySelectorAll('.trust-badge');
        this.init();
    }
    
    init() {
        this.badges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.animationDelay = `${index * 0.1}s`;
                badge.classList.add('animate-in');
            }, 1000);
        });
    }
}

// Form Enhancement
class FormEnhancer {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }
    
    init() {
        this.forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Add floating label effect
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });
                
                // Check if already filled
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            });
        });
    }
}

// Video Background Enhancement
class VideoEnhancer {
    constructor() {
        this.videos = document.querySelectorAll('video');
        this.init();
    }
    
    init() {
        this.videos.forEach(video => {
            video.addEventListener('loadeddata', () => {
                video.parentElement.classList.add('video-loaded');
            });
            
            // Optimize playback
            video.setAttribute('playsinline', '');
            video.setAttribute('preload', 'metadata');
        });
    }
}

// Performance Monitor
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Core animations
    new ScrollReveal();
    new SubtleParallax();
    new StickyCTA();
    
    // Enhancement features
    new ImageLoader();
    new SmoothScroll();
    new TrustBadgeAnimator();
    new FormEnhancer();
    new VideoEnhancer();
    new PerformanceOptimizer();
    
    // Add loaded class to body
    document.body.classList.add('enhanced');
});