// Hero Trust Badges Check - Stellt sicher, dass die Badges korrekt positioniert sind
(function() {
    'use strict';
    
    // Warte bis DOM geladen ist
    document.addEventListener('DOMContentLoaded', function() {
        const trustBadges = document.querySelector('.hero-trust-badges');
        
        if (trustBadges) {
            // Prüfe die Position und korrigiere falls nötig
            const computedStyle = window.getComputedStyle(trustBadges);
            const position = computedStyle.position;
            const zIndex = computedStyle.zIndex;
            const display = computedStyle.display;
            
            console.log('Trust Badges Check:', {
                position: position,
                zIndex: zIndex,
                display: display,
                top: computedStyle.top,
                left: computedStyle.left
            });
            
            // Wenn die Badges falsch positioniert sind
            if (position === 'absolute' || position === 'fixed' || 
                parseInt(zIndex) > 100 || display === 'none') {
                
                console.warn('Trust Badges haben problematische Styles - Korrigiere...');
                
                // Direkte Style-Korrektur
                trustBadges.style.cssText = `
                    position: relative !important;
                    display: flex !important;
                    z-index: 1 !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    margin-top: 3rem !important;
                    background: transparent !important;
                    box-shadow: none !important;
                `;
            }
            
            // Prüfe ob Badges im sichtbaren Bereich sind
            const rect = trustBadges.getBoundingClientRect();
            if (rect.top < 0 || rect.top > window.innerHeight) {
                console.warn('Trust Badges sind außerhalb des sichtbaren Bereichs');
            }
            
            // Optional: Temporär ausblenden falls weiterhin Probleme
            // Aktivieren durch Hinzufügen von ?hide-trust-badges zur URL
            if (window.location.search.includes('hide-trust-badges')) {
                trustBadges.style.display = 'none';
                console.log('Trust Badges temporär ausgeblendet (URL-Parameter)');
            }
        }
    });
    
    // Globale Funktion zum Debuggen
    window.debugTrustBadges = function() {
        const trustBadges = document.querySelector('.hero-trust-badges');
        if (trustBadges) {
            const rect = trustBadges.getBoundingClientRect();
            const styles = window.getComputedStyle(trustBadges);
            
            console.table({
                'Position': styles.position,
                'Display': styles.display,
                'Z-Index': styles.zIndex,
                'Top': rect.top + 'px',
                'Left': rect.left + 'px',
                'Width': rect.width + 'px',
                'Height': rect.height + 'px',
                'Background': styles.backgroundColor,
                'Box-Shadow': styles.boxShadow
            });
            
            // Highlight mit rotem Rahmen
            trustBadges.style.outline = '3px solid red';
            setTimeout(() => {
                trustBadges.style.outline = '';
            }, 3000);
        }
    };
    
    console.log('Trust Badges Check geladen. Nutze window.debugTrustBadges() zum Debuggen.');
})();