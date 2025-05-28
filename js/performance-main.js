// Performance-Optimized Main JavaScript
// Defer loading of non-critical features

// ===== CRITICAL FUNCTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Fast mobile menu
    const initMobileMenu = () => {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
                document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
            });
            
            // Close on link click
            menu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    };
    
    // Initialize immediately
    initMobileMenu();
    
    // Font loading optimization
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    }
});

// ===== LAZY LOAD IMAGES =====
const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Handle picture element
                if (img.parentElement.tagName === 'PICTURE') {
                    const sources = img.parentElement.querySelectorAll('source');
                    sources.forEach(source => {
                        if (source.dataset.srcset) {
                            source.srcset = source.dataset.srcset;
                            source.removeAttribute('data-srcset');
                        }
                    });
                }
                
                // Handle img element
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    // Observe all lazy images
    document.querySelectorAll('img[data-src], picture img').forEach(img => {
        imageObserver.observe(img);
    });
};

// ===== PERFORMANCE MONITORING =====
const initPerformanceMonitoring = () => {
    // Log performance metrics
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        try {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {}
        
        // First Input Delay
        try {
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {}
    }
};

// ===== OPTIMIZE ANIMATIONS =====
const optimizeAnimations = () => {
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || prefersReducedMotion) {
        // Disable complex animations
        document.documentElement.classList.add('reduce-motion');
        
        // Stop GSAP animations if loaded
        if (typeof gsap !== 'undefined') {
            gsap.globalTimeline.pause();
        }
    }
    
    // Use Intersection Observer for scroll animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('.stagger-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                    }, index * 100);
                });
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe animation elements
    document.querySelectorAll('.fade-in-up, .fade-in, .scale-in').forEach(el => {
        animationObserver.observe(el);
    });
};

// ===== DEFER NON-CRITICAL SCRIPTS =====
const loadDeferredScripts = () => {
    // Load GSAP if needed
    if (!window.matchMedia('(max-width: 768px)').matches) {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        gsapScript.async = true;
        gsapScript.onload = () => {
            // Initialize GSAP animations
            if (typeof initGSAPAnimations === 'function') {
                initGSAPAnimations();
            }
        };
        document.body.appendChild(gsapScript);
    }
    
    // Load other deferred scripts
    const deferredScripts = [
        'js/animations.js',
        'js/interactions.js'
    ];
    
    deferredScripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        document.body.appendChild(script);
    });
};

// ===== NETWORK INFORMATION API =====
const adaptToNetwork = () => {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        const slowConnection = connection.saveData || 
                             connection.effectiveType === 'slow-2g' || 
                             connection.effectiveType === '2g';
        
        if (slowConnection) {
            document.documentElement.classList.add('save-data');
            
            // Disable autoplay videos
            document.querySelectorAll('video[autoplay]').forEach(video => {
                video.removeAttribute('autoplay');
            });
            
            // Use lower quality images
            document.querySelectorAll('img[data-src-low]').forEach(img => {
                img.dataset.src = img.dataset.srcLow;
            });
        }
    }
};

// ===== SMOOTH SCROLL WITH PERFORMANCE =====
const initSmoothScroll = () => {
    // Only for desktop
    if (window.innerWidth > 768) {
        let scrollTimeout;
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    // Cancel any ongoing scroll
                    if (scrollTimeout) {
                        cancelAnimationFrame(scrollTimeout);
                    }
                    
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;
                    
                    const animation = (currentTime) => {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        // Easing function
                        const ease = progress < 0.5 
                            ? 2 * progress * progress 
                            : -1 + (4 - 2 * progress) * progress;
                        
                        window.scrollTo(0, startPosition + distance * ease);
                        
                        if (timeElapsed < duration) {
                            scrollTimeout = requestAnimationFrame(animation);
                        }
                    };
                    
                    scrollTimeout = requestAnimationFrame(animation);
                }
            });
        });
    }
};

// ===== INITIALIZATION =====
// Run critical functions immediately
lazyLoadImages();
optimizeAnimations();
adaptToNetwork();
initSmoothScroll();

// Defer non-critical functions
if (document.readyState === 'complete') {
    setTimeout(loadDeferredScripts, 100);
} else {
    window.addEventListener('load', () => {
        setTimeout(loadDeferredScripts, 100);
    });
}

// Initialize performance monitoring
if (window.location.hostname !== 'localhost') {
    initPerformanceMonitoring();
}

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(error => console.log('ServiceWorker registration failed:', error));
    });
}