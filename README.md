# Three Connect Website

## 🚀 Übersicht
Moderne B2B-Vertriebsagentur Website für Three Connect GmbH, gegründet 2025 mit 10 Jahren Branchenerfahrung.

## 📋 Technologie-Stack
- HTML5
- CSS3 (mit CSS Grid & Flexbox)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (lokal gehostet)

## 🛠️ Installation & Deployment

### Lokale Entwicklung
1. Repository klonen
2. Webserver starten (z.B. Live Server in VS Code)
3. index.html im Browser öffnen

### Production Deployment
1. Alle Dateien auf den Webserver hochladen
2. .htaccess für Apache-Server ist bereits konfiguriert
3. SSL-Zertifikat installieren (HTTPS ist erforderlich)
4. DNS auf den Server zeigen lassen

## 📁 Dateistruktur
```
three-connect-website/
├── index.html              # Hauptseite
├── impressum.html          # Impressum
├── datenschutz.html        # Datenschutzerklärung
├── agb.html               # AGB
├── 404.html               # 404 Fehlerseite
├── sitemap.xml            # Sitemap für SEO
├── robots.txt             # Robots-Datei
├── .htaccess              # Apache-Konfiguration
├── css/                   # Stylesheets
│   ├── styles.css         # Haupt-Styles
│   ├── hero-2025-premium.css
│   └── ...                # Weitere CSS-Dateien
├── js/                    # JavaScript
│   ├── hero-2025-effects.js
│   └── ...                # Weitere JS-Dateien
├── images/                # Bilder
└── videos/                # Video-Dateien
    ├── start1.mp4
    ├── Leistungen.mp4
    └── ...
```

## 🔧 Konfiguration

### Google Analytics
In index.html den Tracking-Code ersetzen:
```javascript
gtag('config', 'G-XXXXXXXXXX');  // Durch echte ID ersetzen
```

### Kontaktformular
Das Kontaktformular benötigt ein Backend für die Verarbeitung. Optionen:
- Formspree.io
- Netlify Forms
- Eigenes PHP/Node.js Backend

### E-Mail-Adressen
Alle E-Mail-Adressen auf info@three-connect.de verweisen.

## 🎨 Design-Features
- Modernes Glassmorphism-Design
- Video-Hintergründe
- Smooth Scrolling
- Responsive für alle Geräte
- Typing-Animation im Hero
- Animierte Counter
- Tab-System für About und Projects

## 🔒 Sicherheit
- HTTPS-Redirect in .htaccess
- Security Headers konfiguriert
- XSS-Protection aktiviert
- Content Security Policy gesetzt

## 📈 SEO
- Meta-Tags optimiert
- Open Graph Tags
- Schema.org Markup
- Sitemap.xml vorhanden
- Robots.txt konfiguriert

## 🐛 Bekannte Issues
- Keine (Stand: Januar 2025)

## 📝 Wartung
- Videos komprimieren für bessere Ladezeiten
- Regelmäßige Updates der rechtlichen Seiten
- Analytics-Daten überwachen
- Formular-Spam kontrollieren

## 📞 Support
Bei Fragen oder Problemen:
- E-Mail: info@three-connect.de
- Entwickler: [Entwickler-Kontakt]

## 📄 Lizenz
© 2025 Three Connect GmbH. Alle Rechte vorbehalten.