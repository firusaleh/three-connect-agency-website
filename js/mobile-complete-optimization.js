// Complete Mobile Optimization JavaScript - All Features Intact

document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 768;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // ===== 1. MOBILE VIDEO OPTIMIZATION =====
    function optimizeMobileVideos() {
        if (!isMobile) return;
        
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Performance optimizations
            video.playbackRate = 0.75; // Slower = less CPU
            video.setAttribute('playsinline', ''); // iOS fix
            video.setAttribute('muted', ''); // Ensure autoplay works
            video.setAttribute('preload', 'metadata'); // Only load metadata initially
            
            // Lazy load videos
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play().catch(err => {
                            console.log('Video autoplay failed:', err);
                            // Fallback: Show poster image
                            video.style.display = 'none';
                            const poster = video.getAttribute('poster');
                            if (poster) {
                                const img = document.createElement('img');
                                img.src = poster;
                                img.className = 'video-poster-fallback';
                                video.parentNode.appendChild(img);
                            }
                        });
                        observer.unobserve(video);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(video);
        });
    }
    
    // ===== 2. MOBILE NAVIGATION =====
    function initMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle') || createNavToggle();
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const body = document.body;
        
        // Create toggle if doesn't exist
        function createNavToggle() {
            const toggle = document.createElement('div');
            toggle.className = 'nav-toggle';
            toggle.innerHTML = '<span></span><span></span><span></span>';
            document.querySelector('.nav-header').appendChild(toggle);
            return toggle;
        }
        
        // Toggle menu
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-header') && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
    
    // ===== 3. TOUCH OPTIMIZATIONS =====
    function initTouchOptimizations() {
        if (!isTouch) return;
        
        // Prevent double-tap zoom
        let lastTouchTime = 0;
        document.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTouchTime;
            if (tapLength < 500 && tapLength > 0) {
                e.preventDefault();
            }
            lastTouchTime = currentTime;
        });
        
        // Smooth scrolling for touch
        const scrollElements = document.querySelectorAll('.scrollable, .project-tabs');
        scrollElements.forEach(element => {
            let isScrolling = false;
            let startX;
            let scrollLeft;
            
            element.addEventListener('touchstart', (e) => {
                isScrolling = true;
                startX = e.touches[0].pageX - element.offsetLeft;
                scrollLeft = element.scrollLeft;
            });
            
            element.addEventListener('touchmove', (e) => {
                if (!isScrolling) return;
                e.preventDefault();
                const x = e.touches[0].pageX - element.offsetLeft;
                const walk = (x - startX) * 2;
                element.scrollLeft = scrollLeft - walk;
            });
            
            element.addEventListener('touchend', () => {
                isScrolling = false;
            });
        });
        
        // Add active states for touch
        const interactiveElements = document.querySelectorAll('button, a, .card, .service-block');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 100);
            });
        });
    }
    
    // ===== 4. PERFORMANCE OPTIMIZATIONS =====
    function initPerformanceOptimizations() {
        // Debounce scroll events
        let scrollTimeout;
        const handleScroll = () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = window.requestAnimationFrame(() => {
                // Update scroll-based animations
                updateScrollAnimations();
            });
        };
        
        // Throttle resize events
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Update layout
                updateMobileLayout();
            }, 150);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        
        // Intersection Observer for animations
        const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
    
    // ===== 5. MOBILE LAYOUT FIXES =====
    function updateMobileLayout() {
        if (!isMobile) return;
        
        // Fix viewport height on mobile (accounts for browser UI)
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Adjust hero height
        const hero = document.querySelector('.hero-2025');
        if (hero) {
            hero.style.minHeight = `${window.innerHeight}px`;
        }
        
        // Fix horizontal scroll issues
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section.scrollWidth > window.innerWidth) {
                console.warn('Section causing horizontal scroll:', section);
                section.style.maxWidth = '100vw';
                section.style.overflowX = 'hidden';
            }
        });
    }
    
    // ===== 6. MOBILE ANIMATIONS =====
    function updateScrollAnimations() {
        if (!isMobile) return;
        
        const scrollY = window.pageYOffset;
        
        // Simplified parallax for mobile
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrollY * speed * 0.3); // Reduced effect
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Update progress indicators
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollY / maxScroll) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }
    
    // ===== 7. IMAGE OPTIMIZATION =====
    function optimizeImages() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Add loading="lazy" to all images
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    }
    
    // ===== 8. FORM OPTIMIZATIONS =====
    function optimizeForms() {
        // Prevent zoom on input focus (iOS)
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (isMobile) {
                    document.querySelector('meta[name="viewport"]').setAttribute('content', 
                        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
                }
            });
            
            input.addEventListener('blur', () => {
                if (isMobile) {
                    document.querySelector('meta[name="viewport"]').setAttribute('content', 
                        'width=device-width, initial-scale=1.0');
                }
            });
        });
    }
    
    // ===== 9. MOBILE-SPECIFIC FEATURES =====
    function initMobileFeatures() {
        if (!isMobile) return;
        
        // Add mobile class to body
        document.body.classList.add('is-mobile');
        
        // Create mobile-friendly tab navigation
        const tabContainers = document.querySelectorAll('.project-tabs');
        tabContainers.forEach(container => {
            // Add scroll indicators
            const scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'scroll-indicator';
            scrollIndicator.innerHTML = '<i class="fas fa-chevron-right"></i>';
            container.parentNode.appendChild(scrollIndicator);
            
            container.addEventListener('scroll', () => {
                const maxScroll = container.scrollWidth - container.clientWidth;
                scrollIndicator.style.opacity = container.scrollLeft >= maxScroll - 10 ? '0' : '1';
            });
        });
        
        // Mobile-friendly tooltips
        const tooltips = document.querySelectorAll('[data-tooltip]');
        tooltips.forEach(element => {
            element.addEventListener('click', (e) => {
                e.stopPropagation();
                const tooltip = document.createElement('div');
                tooltip.className = 'mobile-tooltip';
                tooltip.textContent = element.dataset.tooltip;
                document.body.appendChild(tooltip);
                
                const rect = element.getBoundingClientRect();
                tooltip.style.top = `${rect.bottom + 10}px`;
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                
                setTimeout(() => tooltip.remove(), 3000);
            });
        });
    }
    
    // ===== 10. ERROR HANDLING =====
    function initErrorHandling() {
        // Handle failed resources
        window.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23ddd"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999"%3EImage%3C/text%3E%3C/svg%3E';
            }
        }, true);
        
        // Handle network issues
        window.addEventListener('offline', () => {
            const notice = document.createElement('div');
            notice.className = 'offline-notice';
            notice.textContent = 'Sie sind offline. Einige Funktionen sind möglicherweise nicht verfügbar.';
            document.body.appendChild(notice);
        });
        
        window.addEventListener('online', () => {
            const notice = document.querySelector('.offline-notice');
            if (notice) notice.remove();
        });
    }
    
    // ===== INITIALIZE ALL =====
    function init() {
        optimizeMobileVideos();
        initMobileNavigation();
        initTouchOptimizations();
        initPerformanceOptimizations();
        updateMobileLayout();
        optimizeImages();
        optimizeForms();
        initMobileFeatures();
        initErrorHandling();
        
        // Update layout on orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(updateMobileLayout, 100);
        });
        
        // Log performance metrics
        if (window.performance && isMobile) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Mobile Page Load Time: ${pageLoadTime}ms`);
            });
        }
    }
    
    // Start initialization
    init();
});

// Add CSS for mobile-specific features
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    .touch-active {
        opacity: 0.8 !important;
        transform: scale(0.98) !important;
    }
    
    .mobile-tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 10000;
        transform: translateX(-50%);
        animation: fadeIn 0.3s ease;
    }
    
    .scroll-indicator {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.5);
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
    
    .offline-notice {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ff4444;
        color: white;
        padding: 10px;
        text-align: center;
        z-index: 10000;
        font-size: 14px;
    }
    
    .video-poster-fallback {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(mobileStyles);