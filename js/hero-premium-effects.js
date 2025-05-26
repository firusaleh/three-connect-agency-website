// Premium Hero Effects

class PremiumHeroEffects {
    constructor() {
        this.hero = document.querySelector('.hero-2025');
        this.heroContent = document.querySelector('.hero-content');
        this.init();
    }
    
    init() {
        this.setupParallax();
        this.enhanceTypingEffect();
        this.initParticles();
        this.setupScrollEffects();
        this.addInteractiveEffects();
    }
    
    // Parallax effect on mouse move
    setupParallax() {
        if (!this.hero) return;
        
        let ticking = false;
        const layers = this.hero.querySelectorAll('[data-parallax]');
        
        this.hero.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const x = (e.clientX / window.innerWidth - 0.5) * 2;
                    const y = (e.clientY / window.innerHeight - 0.5) * 2;
                    
                    layers.forEach(layer => {
                        const speed = layer.getAttribute('data-parallax') || 1;
                        const xPos = x * speed * 20;
                        const yPos = y * speed * 20;
                        
                        layer.style.transform = `translate(${xPos}px, ${yPos}px)`;
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
    
    // Enhanced typing effect with multiple words
    enhanceTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        
        const words = ['Umsätze', 'Erfolge', 'Kunden', 'Gewinne'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before new word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing
        setTimeout(type, 1000);
    }
    
    // Subtle particle system
    initParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'hero-particles';
        this.hero?.appendChild(particlesContainer);
        
        // Create subtle glowing particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particlesContainer);
        }
    }
    
    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        
        container.appendChild(particle);
        
        // Add CSS animation
        if (!document.querySelector('#particleAnimation')) {
            const style = document.createElement('style');
            style.id = 'particleAnimation';
            style.textContent = `
                @keyframes particleFloat {
                    0% { transform: translateY(100vh) scale(0); opacity: 0; }
                    10% { opacity: 0.6; }
                    90% { opacity: 0.6; }
                    100% { transform: translateY(-100vh) scale(1); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Scroll-based effects
    setupScrollEffects() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        // Smooth scroll on indicator click
        scrollIndicator?.addEventListener('click', (e) => {
            e.preventDefault();
            const nextSection = this.hero.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hide scroll indicator on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator?.classList.add('hidden');
            } else {
                scrollIndicator?.classList.remove('hidden');
            }
            
            // Parallax on scroll
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrolled = window.scrollY;
                const heroText = this.hero?.querySelector('.hero-text');
                if (heroText) {
                    heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
            }, 10);
        });
    }
    
    // Interactive hover effects
    addInteractiveEffects() {
        const ctaButton = this.hero?.querySelector('.gradient-button');
        
        if (ctaButton) {
            // Magnetic button effect
            ctaButton.addEventListener('mousemove', (e) => {
                const rect = ctaButton.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                ctaButton.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            ctaButton.addEventListener('mouseleave', () => {
                ctaButton.style.transform = 'translate(0, 0)';
            });
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new PremiumHeroEffects();
    
    // Add gradient text wrapper
    const h1 = document.querySelector('.hero-2025 h1');
    if (h1 && !h1.querySelector('.gradient-text')) {
        const text = h1.textContent;
        const words = text.split(' ');
        
        // Wrap "neue" in gradient span
        const formattedText = words.map(word => {
            if (word.toLowerCase() === 'neue') {
                return `<span class="gradient-text">${word}</span>`;
            }
            return word;
        }).join(' ');
        
        h1.innerHTML = formattedText;
    }
    
    // Add parallax attributes
    const heroText = document.querySelector('.hero-text');
    const trustBadges = document.querySelector('.hero-trust-badges');
    
    heroText?.setAttribute('data-parallax', '0.5');
    trustBadges?.setAttribute('data-parallax', '0.3');
});

// Add smooth reveal for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe elements for reveal animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in, .fade-in-up, .staggered-fade-in');
    elements.forEach(el => observer.observe(el));
});