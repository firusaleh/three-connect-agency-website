/**
 * Enhanced Video System 2025
 * Modern video background implementation with WebM support,
 * dynamic overlays, and particle effects
 */

class EnhancedVideoSystem {
    constructor() {
        this.videos = [];
        this.particles = [];
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.init();
    }

    init() {
        this.setupVideos();
        this.createParticles();
        this.setupIntersectionObserver();
        this.setupCustomCursor();
        this.setupScrollAnimations();
        this.setupVisibilityHandler();
    }

    setupVideos() {
        const videoSections = [
            {
                sectionId: 'hero',
                sources: [
                    { src: 'videos/start1.webm', type: 'video/webm' },
                    { src: 'videos/start1.mp4', type: 'video/mp4' }
                ],
                overlay: 'gradient-shift'
            },
            {
                sectionId: 'services',
                sources: [
                    { src: 'videos/Leistungen.webm', type: 'video/webm' },
                    { src: 'videos/Leistungen.mp4', type: 'video/mp4' }
                ],
                overlay: 'pulse'
            },
            {
                sectionId: 'about',
                sources: [
                    { src: 'videos/ueber.webm', type: 'video/webm' },
                    { src: 'videos/ueber.mp4', type: 'video/mp4' }
                ],
                overlay: 'wave'
            },
            {
                sectionId: 'process',
                sources: [
                    { src: '/assets/videos/mein-hintergrund.webm', type: 'video/webm' },
                    { src: '/assets/videos/mein-hintergrund.mp4', type: 'video/mp4' }
                ],
                overlay: 'gradient-shift'
            },
            {
                sectionId: 'contact',
                sources: [
                    { src: 'videos/Kontakt.webm', type: 'video/webm' },
                    { src: 'videos/Kontakt.mp4', type: 'video/mp4' }
                ],
                overlay: 'pulse'
            }
        ];

        videoSections.forEach(config => {
            this.createVideoSection(config);
        });
    }

    createVideoSection(config) {
        const section = document.getElementById(config.sectionId);
        if (!section) return;

        // Skip if video already exists
        if (section.querySelector('.video-container')) return;

        // Create video container
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container enhanced';
        
        // Create video element
        const video = document.createElement('video');
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = this.isMobile ? 'metadata' : 'auto';
        
        // Add sources
        config.sources.forEach(source => {
            const sourceEl = document.createElement('source');
            sourceEl.src = source.src;
            sourceEl.type = source.type;
            video.appendChild(sourceEl);
        });

        // Create dynamic overlay
        const overlay = document.createElement('div');
        overlay.className = `dynamic-overlay ${config.overlay}`;
        
        // Add hover interaction
        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            overlay.style.background = `
                radial-gradient(
                    circle at ${x * 100}% ${y * 100}%,
                    rgba(102, 126, 234, 0.6) 0%,
                    rgba(118, 75, 162, 0.4) 50%,
                    rgba(240, 147, 251, 0.2) 100%
                )
            `;
        });

        // Append elements
        videoContainer.appendChild(video);
        videoContainer.appendChild(overlay);
        section.insertBefore(videoContainer, section.firstChild);

        // Store reference
        this.videos.push({ section, video, overlay });
    }

    createParticles() {
        const particleContainers = document.querySelectorAll('.video-section');
        
        particleContainers.forEach(container => {
            // Skip if particles already exist
            if (container.querySelector('.particles')) return;
            
            const particleWrapper = document.createElement('div');
            particleWrapper.className = 'particles';
            
            // Create 50 particles per section
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 15}s`;
                particle.style.animationDuration = `${15 + Math.random() * 10}s`;
                particleWrapper.appendChild(particle);
            }
            
            container.appendChild(particleWrapper);
        });
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');
                if (video) {
                    if (entry.isIntersecting) {
                        video.play().catch(() => {});
                        entry.target.classList.add('video-playing');
                    } else {
                        video.pause();
                        entry.target.classList.remove('video-playing');
                    }
                }
            });
        }, options);

        this.videos.forEach(({ section }) => {
            observer.observe(section);
        });
    }

    setupCustomCursor() {
        if (this.isMobile) return;

        // Check if cursor already exists
        if (document.querySelector('.custom-cursor')) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor movement
        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effects
        document.querySelectorAll('a, button, .interactive').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-up, .scale-in, .slide-in');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing after animation
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }

    // Performance optimization: pause videos when tab is not visible
    setupVisibilityHandler() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.videos.forEach(({ video }) => video.pause());
            } else {
                this.videos.forEach(({ video, section }) => {
                    if (section.classList.contains('video-playing')) {
                        video.play().catch(() => {});
                    }
                });
            }
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.videoSystem = new EnhancedVideoSystem();
});

// Add smooth scrolling with inertia (disabled for now as it can cause issues)
/*
class SmoothScroll {
    constructor() {
        this.currentY = 0;
        this.targetY = 0;
        this.ease = 0.1;
        this.init();
    }

    init() {
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = '0';
        
        const scrollContainer = document.createElement('div');
        scrollContainer.style.position = 'absolute';
        scrollContainer.style.width = '100%';
        scrollContainer.style.willChange = 'transform';
        
        while (document.body.firstChild) {
            scrollContainer.appendChild(document.body.firstChild);
        }
        
        document.body.appendChild(scrollContainer);
        this.scrollContainer = scrollContainer;
        
        this.updateScroll();
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.targetY = window.scrollY;
        });
    }

    updateScroll() {
        this.currentY += (this.targetY - this.currentY) * this.ease;
        this.scrollContainer.style.transform = `translateY(-${this.currentY}px)`;
        requestAnimationFrame(() => this.updateScroll());
    }
}

// Initialize smooth scroll on capable devices - DISABLED FOR NOW
if (!('ontouchstart' in window)) {
    document.addEventListener('DOMContentLoaded', () => {
        // new SmoothScroll();
    });
}
*/