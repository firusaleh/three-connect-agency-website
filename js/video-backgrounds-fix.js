// Sofortiger Fix für das Video im Hintergrund der Services-Sektion
// Diese Datei sollte nach dem Laden der Seite ausgeführt werden

(function() {
    // Funktion, die ausgeführt wird, sobald die Seite geladen ist
    function fixServicesVideo() {
        console.log("Services-Video-Fix wird gestartet...");
        
        // Der Selektor der Services-Sektion
        const servicesSection = document.getElementById('services');
        if (!servicesSection) {
            console.error("Services-Sektion nicht gefunden!");
            return;
        }
        
        // Überprüfe, ob bereits ein video-bg Container existiert
        let videoBg = servicesSection.querySelector('.video-bg');
        
        // Falls nicht, erstelle einen neuen
        if (!videoBg) {
            console.log("Erstelle neuen Video-Container...");
            videoBg = document.createElement('div');
            videoBg.className = 'video-bg';
            
            // Als erstes Element in der Sektion einfügen
            servicesSection.insertBefore(videoBg, servicesSection.firstChild);
        } else {
            console.log("Existierender Video-Container gefunden, wird zurückgesetzt...");
            // Container leeren, um ihn neu zu befüllen
            videoBg.innerHTML = '';
        }
        
        // Video-Element erstellen
        const video = document.createElement('video');
        video.id = 'services-video';
        video.className = 'services-video';
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Source-Element erstellen
        const source = document.createElement('source');
        source.src = 'videos/Leistungen.mp4'; // Pfad zum Video
        source.type = 'video/mp4';
        
        // Video-Overlay erstellen
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';
        
        // Elemente zusammenfügen
        video.appendChild(source);
        videoBg.appendChild(video);
        videoBg.appendChild(overlay);
        
        // Sicherstellen, dass der Video-Container korrekt positioniert ist
        videoBg.style.position = 'absolute';
        videoBg.style.top = '0';
        videoBg.style.left = '0';
        videoBg.style.width = '100%';
        videoBg.style.height = '100%';
        videoBg.style.zIndex = '-2';
        videoBg.style.overflow = 'hidden';
        
        // Sicherstellen, dass das Video korrekt positioniert ist
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.filter = 'brightness(0.8) contrast(1.1)';
        
        // Sicherstellen, dass das Overlay korrekt positioniert ist
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'linear-gradient(135deg, rgba(10, 15, 24, 0.92), rgba(19, 27, 41, 0.88))';
        overlay.style.zIndex = '-1';
        
        // Sicherstellen, dass die Service-Sektion relativ positioniert ist
        servicesSection.style.position = 'relative';
        
        // Versuch, das Video zu starten
        video.load();
        video.play().catch(e => {
            console.warn("Automatisches Abspielen des Services-Videos nicht möglich:", e);
        });
        
        console.log("Services-Video-Fix abgeschlossen!");
        
        // Event-Listener für Fehler beim Laden des Videos
        video.addEventListener('error', function(e) {
            console.error("Fehler beim Laden des Services-Videos:", e);
            
            // Fallback-Hintergrund aktivieren
            videoBg.style.background = 'linear-gradient(135deg, rgba(19, 27, 41, 0.95), rgba(23, 23, 23, 0.8))';
            video.style.display = 'none';
        });
        
        // Event-Listener für erfolgreiches Laden des Videos
        video.addEventListener('loadeddata', function() {
            console.log("Services-Video erfolgreich geladen!");
            
            // Füge eine Klasse hinzu, damit CSS-Übergänge angewendet werden können
            videoBg.classList.add('loaded');
        });
    }
    
    // Ausführung des Fixes, wenn das DOM geladen ist
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixServicesVideo);
    } else {
        fixServicesVideo();
    }
    
    // Sicherheitshalber auch beim vollständigen Laden des Fensters ausführen
    window.addEventListener('load', fixServicesVideo);
    
    // Nach 2 Sekunden nochmals prüfen, falls es Probleme mit dem Laden gibt
    setTimeout(fixServicesVideo, 2000);
})();