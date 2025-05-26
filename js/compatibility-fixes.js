// ===== Cross-Browser-Kompatibilität und Fehlerbehebungen =====
// Dieses Skript behebt potenzielle Probleme und sorgt für bessere Browser-Kompatibilität

document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    
    // ======= Feature Detection und Fallbacks =======
    function applyBrowserFallbacks() {
        // Überprüfen, ob CSS-Variablen unterstützt werden
        if (!window.CSS || !window.CSS.supports || !window.CSS.supports('--test', '0')) {
            console.log('CSS-Variablen werden nicht unterstützt. Fallback-Werte werden angewendet.');
            applyVariableFallbacks();
        }
        
        // Überprüfen, ob backdrop-filter unterstützt wird
        if (!CSS.supports('backdrop-filter', 'blur(10px)')) {
            console.log('backdrop-filter wird nicht unterstützt. Fallback wird angewendet.');
            applyBackdropFilterFallback();
        }
        
        // Überprüfen, ob Intersection Observer unterstützt wird
        if (!('IntersectionObserver' in window)) {
            console.log('IntersectionObserver wird nicht unterstützt. Einfacher Scroll-Listener wird verwendet.');
            applyScrollAnimationFallback();
        }
        
        // Überprüfen, ob Web Video unterstützt wird
        const videoTest = document.createElement('video');
        if (!videoTest.canPlayType) {
            console.log('HTML5 Video wird nicht unterstützt. Statischer Hintergrund wird verwendet.');
            applyVideoFallback();
        }
    }
    
    // Fallback für CSS-Variablen
    function applyVariableFallbacks() {
        const rootStyle = document.documentElement.style;
        
        // Hauptfarbschema
        rootStyle.setProperty('--primary-color', '#0a0f18');
        rootStyle.setProperty('--secondary-color', '#131b29');
        rootStyle.setProperty('--accent-color', '#3498db');
        rootStyle.setProperty('--accent-hover', '#2980b9');
        rootStyle.setProperty('--text-color', '#f0f0f0');
        rootStyle.setProperty('--text-muted', '#a0a0a0');
        rootStyle.setProperty('--text-light', '#ffffff');
        rootStyle.setProperty('--border-color', '#2a3144');
        
        // Schatten
        rootStyle.setProperty('--shadow-sm', '0 5px 15px rgba(0, 0, 0, 0.1)');
        rootStyle.setProperty('--shadow-md', '0 10px 30px rgba(0, 0, 0, 0.2)');
        rootStyle.setProperty('--shadow-lg', '0 20px 40px rgba(0, 0, 0, 0.3)');
        
        // Übergangszeiten
        rootStyle.setProperty('--transition-fast', 'all 0.3s ease');
        rootStyle.setProperty('--transition-medium', 'all 0.5s ease');
        rootStyle.setProperty('--transition-slow', 'all 0.8s ease');
    }
    
    // Fallback für backdrop-filter
    function applyBackdropFilterFallback() {
        // Erhöhe Deckkraft der Hintergründe bei fehlender Unterstützung für backdrop-filter
        const glassElements = document.querySelectorAll('.service-card-inner, .about-stat, .process-cta, .footer-newsletter, .cookie-consent');
        
        glassElements.forEach(element => {
            const currentBg = window.getComputedStyle(element).backgroundColor;
            // Extrahiere RGB-Werte und erhöhe Alpha-Wert
            if (currentBg.includes('rgba')) {
                // Wenn bereits ein Alpha-Wert vorhanden ist
                const rgbaValues = currentBg.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/);
                if (rgbaValues) {
                    const newAlpha = Math.min(parseFloat(rgbaValues[4]) + 0.4, 1);
                    element.style.backgroundColor = `rgba(${rgbaValues[1]}, ${rgbaValues[2]}, ${rgbaValues[3]}, ${newAlpha})`;
                }
            } else if (currentBg.includes('rgb')) {
                // Wenn kein Alpha-Wert vorhanden ist
                const rgbValues = currentBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                if (rgbValues) {
                    element.style.backgroundColor = `rgba(${rgbValues[1]}, ${rgbValues[2]}, ${rgbValues[3]}, 0.9)`;
                }
            }
        });
    }
    
    // Fallback für IntersectionObserver
    function applyScrollAnimationFallback() {
        // Entferne alle Animations-Klassen und zeige Elemente direkt an
        const animatedElements = document.querySelectorAll('.fade-in, .staggered-fade-in');
        
        animatedElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.classList.add('active');
        });
        
        // Einfacher Scroll-Listener für Zähler-Animation
        window.addEventListener('scroll', function() {
            const statNumbers = document.querySelectorAll('.stat-number, .about-stat-number');
            
            statNumbers.forEach(counter => {
                const elementTop = counter.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 50 && !counter.classList.contains('counted')) {
                    const target = parseInt(counter.getAttribute('data-count'));
                    let count = 0;
                    const duration = 2000; // ms
                    const interval = duration / target;
                    
                    const counterInterval = setInterval(() => {
                        count++;
                        counter.textContent = count;
                        
                        if (count >= target) {
                            clearInterval(counterInterval);
                            counter.classList.add('counted');
                        }
                    }, interval);
                }
            });
        });
    }
    
    // Fallback für Videos
    function applyVideoFallback() {
        const videoContainers = document.querySelectorAll(
            '.hero-bg, .services-bg, .about-bg, .process-video-container, .contact-video-container, .matchbase-video-container'
        );
        
        videoContainers.forEach(container => {
            const video = container.querySelector('video');
            if (video) {
                video.style.display = 'none';
                
                // Statisches Hintergrundbild als Fallback
                container.style.backgroundImage = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
                container.style.backgroundSize = 'cover';
                container.style.backgroundPosition = 'center';
            }
        });
    }
    
    // ======= Performance-Optimierungen =======
    function applyPerformanceOptimizations() {
        // Debounce für Scroll-Events
        function debounce(func, wait) {
            let timeout;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        }
        
        // Optimiere Scroll-Handler
        const scrollHandlers = ['scroll', 'resize'];
        scrollHandlers.forEach(event => {
            const originalHandler = window[event];
            if (typeof originalHandler === 'function') {
                window[event] = debounce(originalHandler, 100);
            }
        });
        
        // Bilder Lazy Loading
        if ('loading' in HTMLImageElement.prototype) {
            // Browser unterstützt native lazy loading
            const images = document.querySelectorAll('img:not([loading])');
            images.forEach(img => {
                img.setAttribute('loading', 'lazy');
            });
        } else {
            // Fallback für Browser ohne natives lazy loading
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            imageObserver.unobserve(img);
                        }
                    });
                });
                
                lazyImages.forEach(img => imageObserver.observe(img));
            } else {
                // Für Browser ohne IntersectionObserver
                lazyImages.forEach(img => {
                    img.src = img.dataset.src;
                });
            }
        }
        
        // CSS-Animationen pausieren, wenn Element nicht sichtbar ist
        const animatedElements = document.querySelectorAll('.animated');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    } else {
                        entry.target.style.animationPlayState = 'paused';
                    }
                });
            });
            
            animatedElements.forEach(element => animationObserver.observe(element));
        }
    }
    
    // ======= Fehlerbehebungen für spezifische Browser =======
    function applyBrowserSpecificFixes() {
        // Erkennung des Browsers
        const ua = navigator.userAgent;
        const isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
        const isEdgeLegacy = ua.indexOf('Edge/') > -1;
        const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
        
        // Fixes für Internet Explorer
        if (isIE) {
            console.log('Internet Explorer erkannt. Spezifische Fixes werden angewendet.');
            
            // Object-fit Polyfill für IE
            const objectFitImages = document.querySelectorAll('.hero-video, .services-video, .about-video');
            objectFitImages.forEach(img => {
                if (img.tagName.toLowerCase() === 'video') {
                    img.style.width = '100%';
                    img.style.height = '100%';
                    const container = img.parentElement;
                    container.style.overflow = 'hidden';
                }
            });
            
            // Flexbox-Fixes für IE
            const flexContainers = document.querySelectorAll('.hero-buttons, .hero-trust-badges, .hero-stats, .process-step');
            flexContainers.forEach(container => {
                const items = container.children;
                for (let i = 0; i < items.length; i++) {
                    items[i].style.flexBasis = 'auto';
                }
            });
            
            // Grid-Fallback für IE
            const gridContainers = document.querySelectorAll('.services-grid, .industries-grid, .about-stats, .footer-grid');
            gridContainers.forEach(container => {
                container.style.display = 'flex';
                container.style.flexWrap = 'wrap';
                
                const items = container.children;
                for (let i = 0; i < items.length; i++) {
                    items[i].style.flex = '1 0 300px';
                    items[i].style.margin = '1rem';
                }
            });
        }
        
        // Fixes für Legacy Edge
        if (isEdgeLegacy) {
            console.log('Legacy Edge erkannt. Spezifische Fixes werden angewendet.');
            
            // Fixes für CSS-Variablen in Edge
            const root = document.documentElement;
            const computedStyle = getComputedStyle(root);
            
            const accentColor = computedStyle.getPropertyValue('--accent-color').trim();
            document.querySelectorAll('.accent-color').forEach(el => {
                el.style.color = accentColor;
            });
        }
        
        // Fixes für Safari
        if (isSafari) {
            console.log('Safari erkannt. Spezifische Fixes werden angewendet.');
            
            // Fix für Flexbox in Safari
            document.querySelectorAll('.hero-content, .cta-buttons').forEach(el => {
                el.style.display = 'block';
                el.style.textAlign = 'center';
            });
            
            // Fix für sticky Positioning in Safari
            document.querySelectorAll('.sticky').forEach(el => {
                el.style.position = 'fixed';
            });
        }
    }
    
    // ======= Fehlerbehebung für Responsive Design =======
    function fixResponsiveIssues() {
        // Viewport-Höhe korrekt berechnen (vor allem für mobile Browser)
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        
        // Fix für überlaufende Texte in mobilen Ansichten
        const longTextContainers = document.querySelectorAll('.hero-description, .section-subtitle, p');
        longTextContainers.forEach(container => {
            container.style.wordBreak = 'break-word';
            container.style.overflowWrap = 'break-word';
        });
        
        // Fix für zu große Elemente in mobilen Ansichten
        const potentiallyOverflowingElements = document.querySelectorAll('img, video, .service-card, .contact-form, .footer-newsletter');
        potentiallyOverflowingElements.forEach(element => {
            element.style.maxWidth = '100%';
        });
        
        // Fix für Touch-Geräte (Hover-Effekte)
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
            
            // CSS für Touch-Geräte
            const style = document.createElement('style');
            style.textContent = `
                .touch-device .service-card:hover,
                .touch-device .nav-link:hover,
                .touch-device .btn:hover {
                    /* Spezifische Touch-Anpassungen */
                    transform: none !important;
                }
                
                .touch-device .service-icon {
                    /* Verbesserung der Touch-Ziele */
                    min-height: 44px;
                    min-width: 44px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ======= Analyse und Behebung von JavaScript-Fehlern =======
    function setupErrorHandling() {
        // Globaler Error-Handler
        window.addEventListener('error', function(event) {
            console.error('JavaScript-Fehler erkannt:', event.message, 'in', event.filename, 'Zeile:', event.lineno);
            
            // Versuche, kritische Funktionen wiederherzustellen
            try {
                // Preloader bei Fehler ausblenden
                const preloader = document.querySelector('.preloader');
                if (preloader) {
                    preloader.style.display = 'none';
                }
                
                // Videos bei Fehler pausieren
                const videos = document.querySelectorAll('video');
                videos.forEach(video => {
                    try {
                        video.pause();
                    } catch (e) {
                        console.warn('Video konnte nicht pausiert werden');
                    }
                });
                
                // Animation bei Fehler zurücksetzen
                const animatedElements = document.querySelectorAll('.fade-in, .staggered-fade-in');
                animatedElements.forEach(element => {
                    element.style.opacity = '1';
                    element.style.transform = 'none';
                });
            } catch (recoveryError) {
                console.error('Fehler beim Wiederherstellungsversuch:', recoveryError);
            }
            
            // Verhindern, dass der Fehler im Browser angezeigt wird
            return false;
        });
        
        // Promise-Fehlerbehandlung
        window.addEventListener('unhandledrejection', function(event) {
            console.error('Unbehandelte Promise-Ablehnung:', event.reason);
            
            // Versuch der Wiederherstellung
            if (event.reason && typeof event.reason === 'object' && event.reason.message) {
                if (event.reason.message.includes('video') || event.reason.message.includes('play')) {
                    console.warn('Video-Fehler erkannt. Fallback wird angewendet.');
                    applyVideoFallback();
                }
            }
            
            // Verhindere, dass der Fehler im Browser angezeigt wird
            event.preventDefault();
        });
    }
    
    // ======= Hauptfunktion zur Anwendung aller Fixes =======
    function applyAllFixes() {
        applyBrowserFallbacks();
        applyPerformanceOptimizations();
        applyBrowserSpecificFixes();
        fixResponsiveIssues();
        setupErrorHandling();
        
        console.log('Alle Kompatibilitätsfixes und Fehlerbehebungen wurden angewendet.');
    }
    
    // Exportiere die Funktionen global
    window.compatibilityFixes = {
        applyAll: applyAllFixes,
        browserFallbacks: applyBrowserFallbacks,
        performanceOptimizations: applyPerformanceOptimizations,
        browserSpecificFixes: applyBrowserSpecificFixes,
        responsiveFixes: fixResponsiveIssues,
        errorHandling: setupErrorHandling
    };
    
    // Initialisierung beim Laden
    applyAllFixes();
});