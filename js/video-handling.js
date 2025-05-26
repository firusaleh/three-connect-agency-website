// ===== Video Background Enhancement Script =====
// Diese Datei ist speziell für die Verbesserung der Video-Hintergründe konzipiert.

document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    
    // Liste aller Sektionen mit Videohintergrund
    const videoSections = [
        {
            sectionId: 'home',
            videoId: 'hero-video',
            videoSrc: 'videos/start1.mp4',
            fallbackBackground: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))'
        },
        {
            sectionId: 'services',
            videoId: 'services-video',
            videoSrc: 'videos/Leistungen.mp4',
            fallbackBackground: 'linear-gradient(135deg, rgba(19, 27, 41, 0.95), rgba(23, 23, 23, 0.8))'
        },
        {
            sectionId: 'about',
            videoId: 'about-video',
            videoSrc: 'videos/ueber.mp4',
            fallbackBackground: 'linear-gradient(to right, rgba(10, 15, 24, 0.9), rgba(19, 27, 41, 0.8))'
        },
        {
            sectionId: 'process',
            videoId: 'process-video',
            videoSrc: 'videos/Prozess.mp4',
            fallbackBackground: 'linear-gradient(135deg, rgba(10, 10, 35, 0.9), rgba(10, 10, 35, 0.8))'
        },
        {
            sectionId: 'contact',
            videoId: 'contact-video',
            videoSrc: 'videos/Kontakt.mp4',
            fallbackBackground: 'linear-gradient(135deg, rgba(10, 15, 24, 0.9), rgba(19, 27, 41, 0.8))'
        },
        {
            sectionId: 'matchbase',
            videoId: 'matchbase-video',
            videoSrc: 'videos/MatchBase.mp4',
            fallbackBackground: 'linear-gradient(135deg, rgba(10, 10, 35, 0.9), rgba(10, 10, 35, 0.8))'
        }
    ];
    
    // Initialisiere alle Videohintergründe
    initVideoBackgrounds();
    
    // Funktion zur Initialisierung aller Videohintergründe
    function initVideoBackgrounds() {
        videoSections.forEach(section => {
            setupVideoBackground(section);
        });
    }
    
    // Setup für jeden einzelnen Videohintergrund
    function setupVideoBackground(section) {
        const sectionElement = document.getElementById(section.sectionId);
        const videoElement = document.getElementById(section.videoId);
        
        if (!sectionElement || !videoElement) {
            console.warn(`Element für Sektion ${section.sectionId} oder Video ${section.videoId} nicht gefunden.`);
            return;
        }
        
        // Verbessere die Sichtbarkeit des Videos
        enhanceVideoVisibility(videoElement);
        
        // Füge Fehlerbehandlung hinzu
        handleVideoErrors(videoElement, sectionElement, section.fallbackBackground);
        
        // Performance-Optimierung: Pausiere Videos, wenn sie nicht sichtbar sind
        optimizeVideoPerformance(videoElement, sectionElement);
    }
    
    // Funktion zur Verbesserung der Sichtbarkeit der Videos
    function enhanceVideoVisibility(videoElement) {
        // Verbessere die Sichtbarkeit durch CSS-Anpassungen
        videoElement.style.filter = "brightness(0.85) contrast(1.15) saturate(1.1)";
        videoElement.style.objectFit = "cover";
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        
        // Erhöhe die Priorität des Ladens
        videoElement.setAttribute('preload', 'auto');
        
        // Stelle sicher, dass das Video responsiv ist
        videoElement.style.minHeight = "100%";
        videoElement.style.minWidth = "100%";
        videoElement.style.position = "absolute";
        videoElement.style.top = "50%";
        videoElement.style.left = "50%";
        videoElement.style.transform = "translate(-50%, -50%) scale(1.05)";
    }
    
    // Fehlerbehandlung für Videos
    function handleVideoErrors(videoElement, sectionElement, fallbackBackground) {
        videoElement.addEventListener('error', function(e) {
            console.error('Fehler beim Laden des Videos:', this.src, e);
            
            // Bei Fehlern das Video ausblenden und Fallback-Hintergrund anzeigen
            this.style.display = 'none';
            
            // Fallback-Hintergrund aktivieren
            const containerElement = this.closest('.hero-bg, .services-bg, .about-bg, .process-video-container, .clients-video-container, .contact-video-container, .matchbase-video-container, .video-bg');
            
            if (containerElement) {
                containerElement.style.background = fallbackBackground;
            } else {
                sectionElement.style.background = fallbackBackground;
            }
            
            // Status-Meldung
            console.log('Fallback-Hintergrund für Sektion', sectionElement.id, 'aktiviert');
        });
        
        // Erfolgsmeldung beim erfolgreichen Laden
        videoElement.addEventListener('loadeddata', function() {
            console.log('Video für Sektion', sectionElement.id, 'erfolgreich geladen');
        });
    }
    
    // Performance-Optimierung durch Pausieren nicht sichtbarer Videos
    function optimizeVideoPerformance(videoElement, sectionElement) {
        // Prüfen, ob IntersectionObserver unterstützt wird
        if ('IntersectionObserver' in window) {
            // Erstelle IntersectionObserver für Sichtbarkeitsbestimmung
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Video abspielen, wenn Sektion sichtbar ist
                        if (videoElement.paused) {
                            videoElement.play().catch(e => {
                                console.warn('Automatische Wiedergabe nicht möglich:', e);
                            });
                        }
                    } else {
                        // Video pausieren, wenn Sektion nicht sichtbar ist
                        if (!videoElement.paused) {
                            videoElement.pause();
                        }
                    }
                });
            }, { threshold: 0.1 }); // Bei 10% Sichtbarkeit reagieren
            
            // Sektion beobachten
            observer.observe(sectionElement);
        } else {
            // Fallback für Browser ohne IntersectionObserver
            // Immer versuchen, das Video zu starten
            videoElement.play().catch(e => {
                console.warn('Automatische Wiedergabe nicht möglich:', e);
            });
            
            // Simple Scroll-basierte Erkennung
            window.addEventListener('scroll', function() {
                const rect = sectionElement.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    if (videoElement.paused) {
                        videoElement.play().catch(e => {
                            console.warn('Automatische Wiedergabe nach Scrollen nicht möglich:', e);
                        });
                    }
                } else {
                    if (!videoElement.paused) {
                        videoElement.pause();
                    }
                }
            });
        }
    }
    
    // Vereinfachte Funktion zur Anpassung der Videoqualität
    function adjustVideoQuality() {
        const width = window.innerWidth;
        
        videoSections.forEach(section => {
            const videoElement = document.getElementById(section.videoId);
            
            if (!videoElement) return;
            
            // Versuche das Video einfach neu zu laden
            videoElement.load();
            
            // Spiele das Video, wenn es sichtbar ist
            const isVisible = isElementInViewport(videoElement);
            if (isVisible) {
                videoElement.play().catch(e => {
                    console.warn('Automatische Wiedergabe nach Qualitätsanpassung nicht möglich:', e);
                });
            }
        });
    }
    
    // Hilfsfunktion zur Prüfung, ob ein Element im Viewport ist
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Aktualisiere Videoqualität bei Fenstergrößenänderung
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustVideoQuality, 300);
    });
    
    // Funktion zum Hinzufügen eines Video-Hintergrunds zu einer Sektion
    window.addVideoBackground = function(sectionId, videoSrc) {
        const section = document.getElementById(sectionId);
        if (!section) return false;
        
        // Erstelle Container für Video-Hintergrund
        const videoContainer = document.createElement('div');
        videoContainer.className = `${sectionId}-video-container video-bg`;
        videoContainer.style.position = 'absolute';
        videoContainer.style.top = '0';
        videoContainer.style.left = '0';
        videoContainer.style.width = '100%';
        videoContainer.style.height = '100%';
        videoContainer.style.zIndex = '-1';
        
        // Erstelle Video-Element
        const video = document.createElement('video');
        video.id = `${sectionId}-video`;
        video.className = `${sectionId}-video`;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Erstelle Source-Element
        const source = document.createElement('source');
        source.src = videoSrc;
        source.type = 'video/mp4';
        
        // Füge Source zum Video hinzu
        video.appendChild(source);
        
        // Erstelle Overlay
        const overlay = document.createElement('div');
        overlay.className = `${sectionId}-overlay video-overlay`;
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'linear-gradient(135deg, rgba(10, 15, 24, 0.9), rgba(19, 27, 41, 0.8))';
        
        // Füge Video und Overlay zum Container hinzu
        videoContainer.appendChild(video);
        videoContainer.appendChild(overlay);
        
        // Füge Container zur Sektion hinzu (als erstes Kind)
        section.insertBefore(videoContainer, section.firstChild);
        
        // Setze Position der Sektion auf relativ, falls nicht bereits gesetzt
        if (getComputedStyle(section).position === 'static') {
            section.style.position = 'relative';
        }
        
        // Initialisiere den neuen Videohintergrund
        setupVideoBackground({
            sectionId: sectionId,
            videoId: `${sectionId}-video`,
            videoSrc: videoSrc,
            fallbackBackground: 'linear-gradient(135deg, rgba(10, 15, 24, 0.9), rgba(19, 27, 41, 0.8))'
        });
        
        return true;
    };
    
    // Exportiere Funktionen global
    window.videoBackgrounds = {
        init: initVideoBackgrounds,
        adjust: adjustVideoQuality,
        add: addVideoBackground
    };
});