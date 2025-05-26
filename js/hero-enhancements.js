// Hero Section Enhancements

// Typing Animation for "Umsätze"
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.element.innerHTML = this.txt;
        
        let typeSpeed = 150;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Particle Effects
class ParticleSystem {
    constructor() {
        this.container = document.querySelector('.hero-2025 .particles');
        if (!this.container) return;
        
        this.particleCount = 30;
        this.particles = [];
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 10;
        const left = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.3;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            opacity: ${opacity};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
}

// Parallax Effect for Hero Elements
class HeroParallax {
    constructor() {
        this.elements = document.querySelectorAll('.hero-2025 [data-parallax]');
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
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Smooth Scroll to Next Section
class SmoothScrollToNext {
    constructor() {
        this.scrollIndicator = document.querySelector('.hero-2025 .scroll-indicator');
        if (!this.scrollIndicator) return;
        
        this.init();
    }
    
    init() {
        this.scrollIndicator.addEventListener('click', () => {
            const heroSection = document.getElementById('home');
            const nextSection = heroSection.nextElementSibling;
            
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Make it look clickable
        this.scrollIndicator.style.cursor = 'pointer';
    }
}

// Enhanced Button Interactions
class ButtonEnhancements {
    constructor() {
        this.buttons = document.querySelectorAll('.hero-2025 .hero-cta');
        this.init();
    }
    
    init() {
        this.buttons.forEach(button => {
            // Add magnetic effect on hover
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// Hero Text Animation on Load
class HeroTextAnimation {
    constructor() {
        this.heroText = document.querySelector('.hero-2025 .hero-text');
        if (!this.heroText) return;
        
        this.init();
    }
    
    init() {
        // Add staggered animations to child elements
        const elements = this.heroText.querySelectorAll('*');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Video Optimization
class VideoOptimizer {
    constructor() {
        this.video = document.querySelector('.hero-2025 video');
        if (!this.video) return;
        
        this.init();
    }
    
    init() {
        // Ensure video plays on mobile
        this.video.setAttribute('playsinline', '');
        this.video.setAttribute('webkit-playsinline', '');
        
        // Retry play if failed
        this.video.addEventListener('pause', () => {
            if (this.video.currentTime === 0) {
                setTimeout(() => {
                    this.video.play().catch(() => {});
                }, 1000);
            }
        });
    }
}

// Add Parallax Data Attributes
function addParallaxAttributes() {
    const heroTitle = document.querySelector('.hero-2025 .hero-title');
    const heroSubtitle = document.querySelector('.hero-2025 p.hero-subtitle:last-of-type');
    const heroCTA = document.querySelector('.hero-2025 .hero-cta-group');
    const trustBadges = document.querySelector('.hero-2025 .hero-trust-badges');
    
    if (heroTitle) heroTitle.setAttribute('data-parallax', '0.3');
    if (heroSubtitle) heroSubtitle.setAttribute('data-parallax', '0.2');
    if (heroCTA) heroCTA.setAttribute('data-parallax', '0.15');
    if (trustBadges) trustBadges.setAttribute('data-parallax', '0.1');
}

// Initialize all hero enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add parallax attributes
    addParallaxAttributes();
    
    // Initialize typing effect
    const typedElement = document.querySelector('.hero-2025 .typed-text');
    if (typedElement) {
        const words = ['Umsätze', 'Erfolg', 'Wachstum', 'Performance'];
        new TypeWriter(typedElement, words);
    }
    
    // Initialize other features
    new ParticleSystem();
    new HeroParallax();
    new SmoothScrollToNext();
    new ButtonEnhancements();
    new HeroTextAnimation();
    new VideoOptimizer();
});