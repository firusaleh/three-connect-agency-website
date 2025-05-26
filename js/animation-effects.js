// ===== Erweiterte Animations- und UI-Effekte =====
// Dieses Skript verbessert die visuellen Effekte und Animationen auf der Website

document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    
    // ======= Parallax Effekte =======
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-bg, .hero-content, .services-decor');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                // Geschwindigkeit des Parallax-Effekts (je höher, desto langsamer)
                const speed = element.getAttribute('data-parallax-speed') || 5;
                
                // Berechne neue Position
                const yPos = -(scrollPosition / parseInt(speed));
                
                // Wende Parallax-Effekt an
                if (element.classList.contains('hero-content')) {
                    // Content bewegt sich nach oben beim Scrollen
                    element.style.transform = `translateY(${yPos}px)`;
                } else if (element.classList.contains('parallax-bg')) {
                    // Hintergrund bewegt sich langsamer als der Vordergrund
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                } else if (element.classList.contains('services-decor')) {
                    // Dekorative Elemente bewegen sich in entgegengesetzte Richtung
                    element.style.transform = `translate3d(${-yPos}px, 0, 0)`;
                }
            });
        });
    }
    
    // ======= Erweiterte Hover-Effekte =======
    function enhanceHoverEffects() {
        // Verbesserte Hover-Effekte für Service-Karten
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Finde Icon innerhalb der Karte
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    // Hinzufügen einer zusätzlichen Rotation
                    icon.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background 0.5s';
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
                
                // Glow-Effekt für die Karte
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(52, 152, 219, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = '';
                }
                
                // Zurücksetzen des Schattens
                this.style.boxShadow = '';
            });
        });
        
        // Animierte Buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                // Scale-Effekt beim Hover
                this.style.transform = 'translateY(-3px) scale(1.02)';
                
                // Icon-Animation
                const icon = this.querySelector('.btn-icon');
                if (icon) {
                    icon.style.transform = 'translateX(5px)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
                
                const icon = this.querySelector('.btn-icon');
                if (icon) {
                    icon.style.transform = '';
                }
            });
            
            // Klick-Animation
            button.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(-1px) scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
        });
    }
    
    // ======= Scroll-Animations-Controller =======
    function initScrollAnimations() {
        // Elemente, die animiert werden sollen
        const animatedElements = document.querySelectorAll('.fade-in, .staggered-fade-in, .slide-in-left, .slide-in-right, .zoom-in');
        
        // Prüfe, ob IntersectionObserver unterstützt wird
        if (!('IntersectionObserver' in window)) {
            // Fallback: Alle Elemente direkt anzeigen
            animatedElements.forEach(element => {
                setTimeout(() => {
                    if (element.classList.contains('fade-in') || element.classList.contains('staggered-fade-in')) {
                        element.classList.add('active');
                    } else if (element.classList.contains('slide-in-left')) {
                        element.classList.add('active-left');
                    } else if (element.classList.contains('slide-in-right')) {
                        element.classList.add('active-right');
                    } else if (element.classList.contains('zoom-in')) {
                        element.classList.add('active-zoom');
                    }
                }, 300);
            });
            return;
        }
        
        // Intersection Observer erstellen
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = element.getAttribute('data-delay') || 0;
                    
                    // Verzögerte Animation basierend auf Attribut
                    setTimeout(() => {
                        // Füge entsprechende Klasse basierend auf Animation hinzu
                        if (element.classList.contains('fade-in') || element.classList.contains('staggered-fade-in')) {
                            element.classList.add('active');
                        } else if (element.classList.contains('slide-in-left')) {
                            element.classList.add('active-left');
                        } else if (element.classList.contains('slide-in-right')) {
                            element.classList.add('active-right');
                        } else if (element.classList.contains('zoom-in')) {
                            element.classList.add('active-zoom');
                        }
                    }, parseInt(delay) || 0);
                    
                    // Element nicht mehr beobachten
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1, // 10% Sichtbarkeit reicht aus
            rootMargin: '0px 0px -50px 0px' // Trigger etwas früher
        });
        
        // Starte Beobachtung für alle Elemente
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // ======= Verbesserte Glanzeffekte =======
    function enhanceGlowEffects() {
        // Pulse-Buttons mit verbesserten Gloweffekten
        const pulseButtons = document.querySelectorAll('.pulse-btn');
        
        pulseButtons.forEach(button => {
            // Original-Animation überschreiben
            button.style.animation = 'none';
            
            // Neue Pulse-Elemente hinzufügen
            const pulseElement = document.createElement('span');
            pulseElement.className = 'enhanced-pulse';
            button.appendChild(pulseElement);
            
            // Zusätzliche Glow-Reflexionen
            const reflectionElement = document.createElement('span');
            reflectionElement.className = 'glow-reflection';
            button.appendChild(reflectionElement);
            
            // CSS für neue Elemente
            if (!document.getElementById('enhanced-pulse-styles')) {
                const style = document.createElement('style');
                style.id = 'enhanced-pulse-styles';
                style.textContent = `
                    .enhanced-pulse {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        border-radius: inherit;
                        animation: enhancedPulse 2s infinite;
                        pointer-events: none;
                        z-index: -1;
                    }
                    
                    @keyframes enhancedPulse {
                        0% {
                            box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
                            opacity: 1;
                        }
                        70% {
                            box-shadow: 0 0 0 15px rgba(52, 152, 219, 0);
                            opacity: 0;
                        }
                        100% {
                            box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
                            opacity: 0;
                        }
                    }
                    
                    .glow-reflection {
                        position: absolute;
                        top: -30%;
                        left: -10%;
                        width: 60%;
                        height: 200%;
                        background: linear-gradient(
                            90deg,
                            rgba(255, 255, 255, 0) 0%,
                            rgba(255, 255, 255, 0.1) 47%,
                            rgba(255, 255, 255, 0.3) 50%,
                            rgba(255, 255, 255, 0.1) 53%,
                            rgba(255, 255, 255, 0) 100%
                        );
                        transform: rotate(25deg);
                        pointer-events: none;
                        animation: moveReflection 4s infinite;
                    }
                    
                    @keyframes moveReflection {
                        0% {
                            left: -150%;
                        }
                        100% {
                            left: 150%;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }
    
    // ======= Dynamische Texteffekte =======
    function initTextEffects() {
        // Elemente, die einen Text-Highlight-Effekt benötigen
        const highlightElements = document.querySelectorAll('.highlight-text');
        
        if (highlightElements.length === 0) return;
        
        // CSS für Text-Highlights
        if (!document.getElementById('highlight-text-styles')) {
            const style = document.createElement('style');
            style.id = 'highlight-text-styles';
            style.textContent = `
                .highlight-char {
                    display: inline-block;
                    transition: transform 0.2s ease, color 0.2s ease;
                }
                
                .highlight-active {
                    color: var(--accent-color);
                    transform: translateY(-5px);
                }
            `;
            document.head.appendChild(style);
        }
        
        highlightElements.forEach(element => {
            // Text in Span-Elemente aufteilen, um Einzelbuchstaben zu manipulieren
            const text = element.textContent;
            element.innerHTML = '';
            
            [...text].forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'highlight-char';
                element.appendChild(span);
            });
            
            // Hover-Effekt auf dem Container
            element.addEventListener('mouseover', function() {
                const chars = this.querySelectorAll('.highlight-char');
                chars.forEach((char, index) => {
                    setTimeout(() => {
                        char.classList.add('highlight-active');
                        
                        setTimeout(() => {
                            char.classList.remove('highlight-active');
                        }, 600);
                    }, index * 30);
                });
            });
        });
    }
    
    // ======= Smooth Scrolling =======
    function enhanceSmoothScrolling() {
        // Verbessere das Scroll-Verhalten
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Scroll-Verhalten mit einer benutzerdefinierten Animation
                    const startPosition = window.pageYOffset;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80; // Kopfzeile berücksichtigen
                    const distance = targetPosition - startPosition;
                    const duration = 1000; // ms
                    let startTime = null;
                    
                    function animation(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        const timeElapsed = currentTime - startTime;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        // Easing-Funktion für sanften Übergang
                        const easeInOutQuad = progress < 0.5
                            ? 2 * progress * progress
                            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                        
                        window.scrollTo(0, startPosition + distance * easeInOutQuad);
                        
                        if (timeElapsed < duration) {
                            requestAnimationFrame(animation);
                        }
                    }
                    
                    requestAnimationFrame(animation);
                    
                    // URL-Hash aktualisieren
                    history.pushState(null, null, targetId);
                }
            });
        });
    }
    
    // ======= Interaktive Elemente =======
    function enhanceInteractiveElements() {
        // Hinzufügen von Hover-Effekten für alle interaktiven Elemente
        const interactiveElements = document.querySelectorAll('.service-link, .footer-links a, .nav-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s, padding 0.3s';
                
                if (this.classList.contains('service-link')) {
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
                        icon.style.transform = 'translateX(5px)';
                    }
                }
            });
            
            element.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });
    }
    
    // Browser-Kompatibilitätsprüfung für Animationen
    function checkBrowserSupport() {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const hasWebAnimations = 'animate' in Element.prototype;
        
        if (isReducedMotion) {
            // Deaktiviere alle unnötigen Animationen bei Bevorzugung reduzierter Bewegung
            document.body.classList.add('reduced-motion');
            console.log('Reduzierte Bewegung bevorzugt: Einige Animationen werden deaktiviert.');
        }
        
        if (!hasWebAnimations) {
            console.log('Web Animations API nicht unterstützt: Fallback-Animationen werden verwendet.');
        }
        
        return {
            isReducedMotion,
            hasWebAnimations
        };
    }
    
    // Initialisiere alle visuellen Verbesserungen
    function initAllEnhancements() {
        // Prüfe Browser-Unterstützung
        const { isReducedMotion } = checkBrowserSupport();
        
        // Initialisiere Effekte mit Berücksichtigung reduzierter Bewegung
        if (!isReducedMotion) {
            initParallaxEffects();
            initScrollAnimations();
            enhanceGlowEffects();
            initTextEffects();
        }
        
        // Diese Effekte werden immer initialisiert, da sie für die Funktionalität wichtig sind
        enhanceHoverEffects();
        enhanceSmoothScrolling();
        enhanceInteractiveElements();
        
        console.log('UI-Effekte erfolgreich initialisiert.');
    }
    
    // Exportiere die Funktionen global
    window.uiEffects = {
        initAll: initAllEnhancements,
        parallax: initParallaxEffects,
        hover: enhanceHoverEffects,
        scrollAnimations: initScrollAnimations,
        glowEffects: enhanceGlowEffects,
        textEffects: initTextEffects,
        smoothScrolling: enhanceSmoothScrolling,
        interactiveElements: enhanceInteractiveElements
    };
    
    // Initialisierung aller Effekte beim Laden
    initAllEnhancements();
});