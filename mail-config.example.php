<?php
// BEISPIEL-KONFIGURATION
// Kopieren Sie diese Datei zu 'mail-config.php' und tragen Sie Ihre echten Daten ein

// Sicherheitscheck
if (!defined('SECURE_ACCESS')) {
    define('SECURE_ACCESS', true);
}

// SMTP Server Einstellungen
define('SMTP_HOST', 'smtp.gmail.com');  // Ihr SMTP Server
define('SMTP_PORT', 587);                // SMTP Port (meist 587 oder 465)

// Ihre Email-Zugangsdaten
define('SMTP_USER', 'ihre-email@domain.de');     // Ihre Email-Adresse
define('SMTP_PASS', 'ihr-app-passwort');         // Ihr App-spezifisches Passwort

// Email-Adressen
define('MAIL_FROM', 'ihre-email@domain.de');     // Absender-Email
define('MAIL_TO', 'empfaenger@domain.de');       // Wo sollen Anfragen ankommen?
define('MAIL_NAME', 'Ihr Firmenname');           // Absender-Name

// Beispiele für verschiedene Provider:
// 
// Gmail/Google Workspace:
// SMTP_HOST = 'smtp.gmail.com'
// SMTP_PORT = 587
// Benötigt App-spezifisches Passwort!
//
// Ionos/1&1:
// SMTP_HOST = 'smtp.ionos.de'
// SMTP_PORT = 587
//
// Strato:
// SMTP_HOST = 'smtp.strato.de'
// SMTP_PORT = 587
//
// All-Inkl:
// SMTP_HOST = 'w00xxxxx.kasserver.com'
// SMTP_PORT = 587

?>