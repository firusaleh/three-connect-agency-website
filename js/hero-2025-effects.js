// Hero 2025 Premium Effects Controller

class Hero2025Effects {
    constructor() {
        this.hero = document.querySelector('.hero-2025');
        this.init();
    }
    
    init() {
        this.setupGlitchText();
        this.initTypingEffect();
        this.initCounterAnimation();
        this.initMouseInteractions();
        this.initCustomCursor();
        this.setupParallaxCards();
        this.initSoundEffects();
    }
    
    // Setup Glitch Text Effect
    setupGlitchText() {
        const glitchElements = document.querySelectorAll('.gradient-glitch');
        glitchElements.forEach(el => {
            el.setAttribute('data-text', el.textContent);
        });
    }
    
    // Initialize Typing Effect
    initTypingEffect() {
        const typingElement = document.querySelector('.gradient-glitch');
        if (!typingElement) return;
        
        // Add typing cursor class
        typingElement.classList.add('typing-cursor');
        
        const words = ['Umsätze', 'Erfolge', 'Kunden', 'Gewinne'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        // Start with first word visible
        typingElement.textContent = words[0];
        typingElement.setAttribute('data-text', words[0]);
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                const newText = currentWord.substring(0, charIndex - 1);
                typingElement.textContent = newText;
                typingElement.setAttribute('data-text', newText);
                charIndex--;
                typeSpeed = 50;
            } else {
                const newText = currentWord.substring(0, charIndex + 1);
                typingElement.textContent = newText;
                typingElement.setAttribute('data-text', newText);
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
        
        // Start typing animation after initial display
        setTimeout(() => {
            isDeleting = true;
            charIndex = words[0].length;
            type();
        }, 2000);
    }
    
    // Counter Animation for Trust Pills
    initCounterAnimation() {
        const counters = document.querySelectorAll('.counter');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                            // Add plus sign for growth
                            if (counter.classList.contains('with-plus')) {
                                counter.textContent += '+';
                            }
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Mouse Interactions for Visual Elements
    initMouseInteractions() {
        const visualArea = document.querySelector('.hero-visual-content');
        const cards = document.querySelectorAll('.stat-card');
        
        if (!visualArea || !cards.length) return;
        
        visualArea.addEventListener('mousemove', (e) => {
            const rect = visualArea.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            cards.forEach((card, index) => {
                const speed = (index + 1) * 0.5;
                const rotateX = y * speed * 10;
                const rotateY = x * speed * 10;
                const translateZ = Math.abs(x * y) * 50;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${-rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(${translateZ}px)
                `;
            });
        });
        
        visualArea.addEventListener('mouseleave', () => {
            cards.forEach(card => {
                card.style.transform = '';
            });
        });
    }
    
    // Custom Cursor with Glow Effect
    initCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorInner = document.createElement('div');
        cursorInner.className = 'cursor-inner';
        cursor.appendChild(cursorInner);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                width: 40px;
                height: 40px;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: screen;
                transition: transform 0.2s ease;
            }
            
            .cursor-inner {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, transparent 70%);
                filter: blur(2px);
                animation: cursorPulse 2s ease-in-out infinite;
            }
            
            @keyframes cursorPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            .custom-cursor.hovering {
                transform: scale(1.5);
            }
            
            .custom-cursor.clicking {
                transform: scale(0.8);
            }
        `;
        document.head.appendChild(style);
        
        // Track cursor
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor animation
        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            cursor.style.left = cursorX - 20 + 'px';
            cursor.style.top = cursorY - 20 + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();
        
        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .stat-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
        
        // Click effect
        document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
        document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
    }
    
    // Parallax effect for stat cards
    setupParallaxCards() {
        const cards = document.querySelectorAll('.stat-card');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            cards.forEach((card, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                card.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Optional sound effects
    initSoundEffects() {
        if (!('AudioContext' in window)) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Hover sound for buttons
        const buttons = document.querySelectorAll('.hero-cta-primary, .hero-cta-ghost');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = 600;
                oscillator.type = 'sine';
                gainNode.gain.value = 0.03;
                
                oscillator.start();
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.stop(audioContext.currentTime + 0.1);
            });
        });
    }
    
    // Light leak effect on mouse movement
    addLightLeakEffect() {
        const lightLeak = document.createElement('div');
        lightLeak.className = 'light-leak';
        this.hero?.appendChild(lightLeak);
        
        let timeout;
        document.addEventListener('mousemove', (e) => {
            clearTimeout(timeout);
            
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            lightLeak.style.background = `
                radial-gradient(
                    circle at ${x}% ${y}%,
                    rgba(102, 126, 234, 0.2) 0%,
                    transparent 50%
                )
            `;
            
            lightLeak.style.opacity = '1';
            
            timeout = setTimeout(() => {
                lightLeak.style.opacity = '0';
            }, 1000);
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new Hero2025Effects();
    
    // Add light leak styles
    const style = document.createElement('style');
    style.textContent = `
        .light-leak {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 5;
            opacity: 0;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});