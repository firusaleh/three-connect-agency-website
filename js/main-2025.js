/**
 * Main JavaScript for Three Connect 2025
 * Modern interactions and functionality
 */

class ThreeConnect2025 {
    constructor() {
        this.init();
    }

    init() {
        this.initPreloader();
        this.initNavigation();
        this.initTheme();
        this.initSoundEffects();
        this.initROICalculator();
        this.initContactForm();
        this.initCookieConsent();
        this.initAIChat();
        this.initAccessibility();
        this.initPerformanceMonitoring();
    }

    initPreloader() {
        const preloader = document.getElementById('preloader');
        const progressBar = document.querySelector('.preloader-progress-bar');
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    document.body.classList.add('loaded');
                    
                    // Completely remove preloader after animation
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        preloader.remove(); // Remove from DOM
                    }, 500);
                    
                    // Start animations
                    this.startAnimations();
                }, 500);
            }
        }, 200);
    }

    initNavigation() {
        const nav = document.querySelector('.nav-2025');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Sticky navigation
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                nav.classList.add('scrolled');
                
                if (currentScroll > lastScroll) {
                    nav.classList.add('hide');
                } else {
                    nav.classList.remove('hide');
                }
            } else {
                nav.classList.remove('scrolled', 'hide');
            }
            
            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offset = nav.offsetHeight;
                    const targetPosition = targetSection.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Active section highlighting
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            rootMargin: '-50% 0px -50% 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    initTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        const root = document.documentElement;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        root.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Smooth transition
            document.body.style.transition = 'background-color 0.3s ease';
        });

        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    initSoundEffects() {
        const soundToggle = document.querySelector('.sound-toggle');
        let soundEnabled = localStorage.getItem('soundEnabled') === 'true';
        
        updateSoundIcon(soundEnabled);

        soundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            localStorage.setItem('soundEnabled', soundEnabled);
            updateSoundIcon(soundEnabled);
            
            if (soundEnabled) {
                playSound('toggle');
            }
        });

        function updateSoundIcon(enabled) {
            const icon = soundToggle.querySelector('i');
            icon.className = enabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
            soundToggle.setAttribute('data-sound', enabled ? 'on' : 'off');
        }
    }

    initROICalculator() {
        const calculator = document.querySelector('.roi-calculator');
        if (!calculator) return;

        const calculateBtn = calculator.querySelector('.calculate-roi');
        const results = calculator.querySelector('.roi-results');

        calculateBtn.addEventListener('click', () => {
            const revenue = parseFloat(document.getElementById('current-revenue').value) || 1000000;
            const teamSize = parseFloat(document.getElementById('sales-team-size').value) || 10;
            const dealSize = parseFloat(document.getElementById('average-deal-size').value) || 50000;

            // AI-powered ROI calculation
            const efficiencyGain = 2.5; // 250% efficiency improvement
            const conversionImprovement = 1.8; // 80% better conversion
            const costReduction = 0.4; // 40% cost reduction

            const additionalRevenue = revenue * 0.3 * efficiencyGain;
            const roi = ((additionalRevenue - (revenue * 0.1)) / (revenue * 0.1)) * 100;
            const paybackPeriod = Math.ceil(12 / (roi / 100));

            // Update results
            document.getElementById('revenue-increase').textContent = formatNumber(additionalRevenue);
            document.getElementById('roi-percentage').textContent = Math.round(roi);
            document.getElementById('payback-period').textContent = paybackPeriod;

            // Show results with animation
            results.style.display = 'block';
            results.classList.add('fade-in-up');
            
            // Scroll to results
            results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        function formatNumber(num) {
            return new Intl.NumberFormat('de-DE').format(Math.round(num));
        }
    }

    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Success
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                submitBtn.classList.add('success');
                
                // Show success message
                this.showNotification('Thank you! We\'ll contact you within 60 seconds.', 'success');
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                }, 3000);
                
            } catch (error) {
                // Error handling
                submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
                submitBtn.classList.add('error');
                
                this.showNotification('Something went wrong. Please try again.', 'error');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('error');
                }, 3000);
            }
        });

        // Dynamic input effects
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    initCookieConsent() {
        const consent = document.getElementById('cookieConsent');
        const hasConsent = localStorage.getItem('cookieConsent');

        if (!hasConsent && consent) {
            setTimeout(() => {
                consent.classList.add('show');
            }, 3000);

            const acceptBtn = consent.querySelector('.cookie-accept');
            const customizeBtn = consent.querySelector('.cookie-customize');

            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'accepted');
                consent.classList.remove('show');
                
                // Initialize analytics
                this.initAnalytics();
            });

            customizeBtn.addEventListener('click', () => {
                // Open cookie preferences modal
                this.openCookiePreferences();
            });
        } else if (hasConsent === 'accepted') {
            this.initAnalytics();
        }
    }

    initAIChat() {
        const chatWidget = document.getElementById('aiChat');
        const chatToggle = chatWidget.querySelector('.chat-toggle');

        chatToggle.addEventListener('click', () => {
            // Open AI chat interface
            this.openAIChat();
        });

        // Simulate new message notification
        setTimeout(() => {
            const notification = chatWidget.querySelector('.chat-notification');
            notification.classList.add('pulse');
        }, 5000);
    }

    initAccessibility() {
        // Skip links
        const skipLinks = document.querySelectorAll('.skip-to-content');
        skipLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.tabIndex = -1;
                    target.focus();
                }
            });
        });

        // Keyboard navigation enhancements
        document.addEventListener('keydown', (e) => {
            // Escape key closes modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Accessibility toggle
        const a11yToggle = document.querySelector('.accessibility-toggle');
        if (a11yToggle) {
            a11yToggle.addEventListener('click', () => {
                this.openAccessibilityPanel();
            });
        }
    }

    initPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            }).observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift
            let clsScore = 0;
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsScore += entry.value;
                        console.log('CLS:', clsScore);
                    }
                }
            }).observe({ entryTypes: ['layout-shift'] });
        }
    }

    startAnimations() {
        // Trigger initial animations
        document.querySelectorAll('.fade-in-up').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    openAIChat() {
        console.log('Opening AI Chat...');
        // Implementation for AI chat interface
    }

    openCookiePreferences() {
        console.log('Opening Cookie Preferences...');
        // Implementation for cookie preferences modal
    }

    openAccessibilityPanel() {
        console.log('Opening Accessibility Panel...');
        // Implementation for accessibility settings
    }

    closeAllModals() {
        // Close any open modals
        document.querySelectorAll('.modal.open').forEach(modal => {
            modal.classList.remove('open');
        });
    }

    initAnalytics() {
        // Initialize analytics after consent
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted'
            });
        }
    }

    playSound(type) {
        if (localStorage.getItem('soundEnabled') !== 'true') return;
        
        const sounds = {
            toggle: '/sounds/toggle.mp3',
            hover: '/sounds/hover.mp3',
            success: '/sounds/success.mp3',
            error: '/sounds/error.mp3'
        };
        
        if (sounds[type]) {
            const audio = new Audio(sounds[type]);
            audio.volume = 0.1;
            audio.play().catch(() => {});
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.threeConnect = new ThreeConnect2025();
    
    // Initialize AOS-like scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in-up, .scale-in, .slide-in').forEach(el => {
        animationObserver.observe(el);
    });
});