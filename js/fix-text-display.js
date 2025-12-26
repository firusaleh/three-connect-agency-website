// Fix für die Textanzeige in Überschriften
document.addEventListener('DOMContentLoaded', () => {
    // Funktion zum Bereinigen von HTML-Tags die als Text angezeigt werden
    function fixTextDisplay() {
        // Hero Titel korrigieren
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.innerText || heroTitle.textContent;
            // Prüfe ob HTML-Entitäten oder Tags als Text angezeigt werden
            if (text.includes('<') || text.includes('&lt;') || text.includes('class=')) {
                heroTitle.innerHTML = 'Steigern Sie Ihre <span class="gradient-text">B2B-Verkäufe</span>';
            }
        }
        
        // Alle Section Titles korrigieren
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            const text = title.innerText || title.textContent;
            if (text.includes('<') || text.includes('&lt;') || text.includes('class=')) {
                // Services Sektion
                if (title.closest('#services')) {
                    title.innerHTML = 'Maßgeschneiderte <span class="title-gradient">B2B-Lösungen</span>';
                }
                // About Sektion
                else if (title.closest('#about')) {
                    title.innerHTML = '2025 gegründet, <span class="title-gradient">10 Jahre Expertise</span>';
                }
                // Process Sektion
                else if (title.closest('#process')) {
                    title.innerHTML = 'Strukturiert zum <span class="title-gradient">Erfolg</span>';
                }
                // Projects Sektion
                else if (title.closest('#projects')) {
                    title.innerHTML = 'Innovative <span class="title-gradient">Lösungen</span>';
                }
                // Contact Sektion
                else if (title.closest('#contact')) {
                    title.innerHTML = 'Lassen Sie uns <span class="title-gradient">gemeinsam starten</span>';
                }
            }
        });
        
        // Alle Service Card Titel korrigieren
        const serviceCards = document.querySelectorAll('.service-card-3d h3');
        serviceCards.forEach(card => {
            const text = card.textContent;
            if (!text.includes('<') && !text.includes('>')) {
                // Text ist bereits korrekt
                return;
            }
            
            // Extrahiere den reinen Text
            const cleanText = text.replace(/<[^>]*>/g, '').trim();
            card.textContent = cleanText;
        });
    }
    
    // Führe Fix aus
    fixTextDisplay();
    
    // Nochmal nach kurzer Verzögerung für dynamisch geladene Inhalte
    setTimeout(fixTextDisplay, 100);
    setTimeout(fixTextDisplay, 500);
});