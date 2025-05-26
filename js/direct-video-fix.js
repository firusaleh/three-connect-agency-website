/**
 * Direkte Lösung für fehlende Video-Hintergründe
 * Diese Datei setzt alle Video-Elemente direkt ein, ohne Abhängigkeiten
 */

// Sofort ausführbare Funktion
(function() {
    // Konfiguration für alle Sektionen mit Video-Hintergründen
    const videoConfig = [
        {
            sectionId: 'home',
            videoPath: 'videos/start1.mp4',
            fallbackBg: 'linear-gradient(135deg, #0a0f18, #131b29)'
        },
        {
            sectionId: 'services',
            videoPath: 'videos/Leistungen.mp4',
            fallbackBg: 'linear-gradient(135deg, rgba(19, 27, 41, 0.95), rgba(23, 23, 23, 0.8))'
        },
        {
            sectionId: 'about',
            videoPath: 'videos/ueber.mp4',
            fallbackBg: 'linear-gradient(to right, rgba(10, 15, 24, 0.9), rgba(19, 27, 41, 0.8))'
        },
        {
            sectionId: 'process',
            videoPath: 'videos/Prozess.mp4',
            fallbackBg: 'linear-gradient(135deg, rgba(10, 10, 35, 0.9), rgba(10, 10, 35, 0.8))'
        },
        {
            sectionId: 'contact',
            videoPath: 'videos/Kontakt.mp4',
            fallbackBg: 'linear-gradient(135deg, rgba(10, 15, 24, 0.9), rgba(19, 27, 41, 0.8))'
        },
        {
            sectionId: 'matchbase',
            videoPath: 'videos/MatchBase.mp4',
            fallbackBg: 'linear-gradient(135deg, rgba(10, 10, 35, 0.9), rgba(10, 10, 35, 0.8))'
        }
    ];

    // CSS direkt einfügen
    const style = document.createElement('style');
    style.textContent = `
        .video-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            overflow: hidden;
        }
        
        .video-bg video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(0.8) contrast(1.1);
        }
        
        .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(10, 15, 24, 0.85), rgba(19, 27, 41, 0.75));
            z-index: -1;
        }
        
        section, .section {
            position: relative;
            isolation: isolate;
        }
        
        /* Fix für iOS-Safari */
        @supports (-webkit-touch-callout: none) {
            .video-bg video {
                position: absolute;
                top: 50%;
                left: 50%;
                min-width: 100%;
                min-height: 100%;
                width: auto;
                height: auto;
                transform: translateX(-50%) translateY(-50%);
            }
        }
    `;
    document.head.appendChild(style);

    // Warten auf DOM-Bereitschaft
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    // Hauptfunktion zum Einrichten aller Video-Hintergründe
    function setupAllVideos() {
        console.log('Einrichtung der Video-Hintergründe wird gestartet...');
        
        videoConfig.forEach(config => {
            setupVideoBackground(
                config.sectionId,
                config.videoPath,
                config.fallbackBg
            );
        });
        
        console.log('Einrichtung der Video-Hintergründe abgeschlossen.');
    }
    
    // Funktion zum Einrichten eines einzelnen Video-Hintergrunds
    function setupVideoBackground(sectionId, videoPath, fallbackBg) {
        console.log(`Einrichtung des Video-Hintergrunds für Sektion '${sectionId}'...`);
        
        // Element finden
        const section = document.getElementById(sectionId);
        if (!section) {
            console.warn(`Sektion mit ID '${sectionId}' wurde nicht gefunden.`);
            return;
        }
        
        // Sicherstellen, dass die Sektion relativ positioniert ist
        if (getComputedStyle(section).position === 'static') {
            section.style.position = 'relative';
        }

        // Bestehende Video-Container entfernen, um alles neu zu erstellen
        const existingContainers = section.querySelectorAll('.video-bg');
        existingContainers.forEach(container => container.remove());
        
        // Neuen Video-Container erstellen
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-bg';
        
        // Video-Element erstellen
        const video = document.createElement('video');
        video.id = `${sectionId}-video`;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Source-Element erstellen
        const source = document.createElement('source');
        source.src = videoPath;
        source.type = 'video/mp4';
        
        // Overlay-Element erstellen
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';
        
        // Alles zusammensetzen
        video.appendChild(source);
        videoContainer.appendChild(video);
        videoContainer.appendChild(overlay);
        
        // Als erstes Element in die Sektion einfügen
        if (section.firstChild) {
            section.insertBefore(videoContainer, section.firstChild);
        } else {
            section.appendChild(videoContainer);
        }
        
        // Fehlerbehandlung
        video.addEventListener('error', function(e) {
            console.error(`Fehler beim Laden des Videos für Sektion '${sectionId}':`, e);
            this.style.display = 'none';
            videoContainer.style.background = fallbackBg;
        });
        
        // Erfolgsmeldung
        video.addEventListener('loadeddata', function() {
            console.log(`Video für Sektion '${sectionId}' erfolgreich geladen.`);
        });
        
        // In einigen Browsern muss die Wiedergabe manuell gestartet werden
        video.play().catch(e => {
            console.warn(`Automatische Wiedergabe für Sektion '${sectionId}' nicht möglich:`, e);
        });
        
        // Pausieren nicht sichtbarer Videos (für Performance)
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (video.paused) {
                            video.play().catch(e => {
                                console.warn(`Wiedergabe des Videos für Sektion '${sectionId}' nicht möglich:`, e);
                            });
                        }
                    } else {
                        if (!video.paused) {
                            video.pause();
                        }
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(section);
        }
        
        console.log(`Video-Hintergrund für Sektion '${sectionId}' wurde eingerichtet.`);
    }
    
    // Ausführung des Skripts
    ready(setupAllVideos);
    
    // Zusätzlich beim Laden des Fensters ausführen, um sicherzustellen, dass Inhalte geladen sind
    window.addEventListener('load', function() {
        setTimeout(setupAllVideos, 500);
    });
})();