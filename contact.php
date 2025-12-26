<?php
// Fehlermeldungen für Debugging (im Produktivbetrieb auskommentieren)
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

// CORS Headers für AJAX-Anfragen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Bei OPTIONS-Request nur Headers senden
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// PHPMailer einbinden
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Email-Konfiguration
require_once 'mail-config.php';

// Funktion für sicheren Input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Nur POST-Anfragen verarbeiten
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // JSON-Daten verarbeiten (für AJAX)
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Daten aus JSON oder POST holen
    $name = isset($input['name']) ? sanitize_input($input['name']) : 
            (isset($_POST['name']) ? sanitize_input($_POST['name']) : '');
    
    $email = isset($input['email']) ? filter_var($input['email'], FILTER_SANITIZE_EMAIL) : 
             (isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '');
    
    $company = isset($input['company']) ? sanitize_input($input['company']) : 
               (isset($_POST['company']) ? sanitize_input($_POST['company']) : '');
    
    $phone = isset($input['phone']) ? sanitize_input($input['phone']) : 
             (isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '');
    
    $service = isset($input['service']) ? sanitize_input($input['service']) : 
               (isset($_POST['service']) ? sanitize_input($_POST['service']) : '');
    
    $budget = isset($input['budget']) ? sanitize_input($input['budget']) : 
              (isset($_POST['budget']) ? sanitize_input($_POST['budget']) : '');
    
    $message = isset($input['message']) ? sanitize_input($input['message']) : 
               (isset($_POST['message']) ? sanitize_input($_POST['message']) : '');
    
    // Validierung
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name ist erforderlich";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Gültige E-Mail-Adresse ist erforderlich";
    }
    
    if (empty($company)) {
        $errors[] = "Unternehmen ist erforderlich";
    }
    
    if (empty($message)) {
        $errors[] = "Nachricht ist erforderlich";
    }
    
    // Wenn Fehler vorhanden sind
    if (!empty($errors)) {
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => implode(", ", $errors)
        ]);
        exit;
    }
    
    // Service-Mapping
    $serviceMap = [
        'website' => 'Website-Erstellung',
        'landing' => 'Landing Pages',
        'seo' => 'SEO-Optimierung',
        'sdr' => 'SDR-Coldcalling',
        'crm' => 'CRM-Einrichtung',
        'software' => 'Software-Entwicklung',
        'andere' => 'Andere'
    ];
    
    // Budget-Mapping
    $budgetMap = [
        'unter-1000' => 'Unter 1.000 €',
        '1000-5000' => '1.000 € - 5.000 €',
        '5000-10000' => '5.000 € - 10.000 €',
        '10000-25000' => '10.000 € - 25.000 €',
        'ueber-25000' => 'Über 25.000 €'
    ];
    
    $serviceText = isset($serviceMap[$service]) ? $serviceMap[$service] : $service;
    $budgetText = isset($budgetMap[$budget]) ? $budgetMap[$budget] : $budget;
    
    try {
        // PHPMailer initialisieren
        $mail = new PHPMailer(true);
        
        // SMTP-Einstellungen
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = SMTP_PORT;
        $mail->CharSet    = 'UTF-8';
        
        // Absender und Empfänger
        $mail->setFrom(MAIL_FROM, 'Three Connect Website');
        $mail->addAddress(MAIL_TO);
        $mail->addReplyTo($email, $name);
        
        // Email-Inhalt (HTML)
        $mail->isHTML(true);
        $mail->Subject = "Neue Kontaktanfrage von $name - $company";
        
        $mail->Body = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #0077b6, #00b4d8); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .field { margin-bottom: 20px; }
                .label { font-weight: bold; color: #0077b6; margin-bottom: 5px; }
                .value { background: white; padding: 10px; border-radius: 5px; border: 1px solid #ddd; }
                .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>🚀 Neue Kontaktanfrage</h2>
                </div>
                <div class='content'>
                    <div class='field'>
                        <div class='label'>Name:</div>
                        <div class='value'>$name</div>
                    </div>
                    <div class='field'>
                        <div class='label'>E-Mail:</div>
                        <div class='value'>$email</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Unternehmen:</div>
                        <div class='value'>$company</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Telefon:</div>
                        <div class='value'>" . ($phone ?: 'Nicht angegeben') . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Gewünschte Leistung:</div>
                        <div class='value'>$serviceText</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Budget:</div>
                        <div class='value'>$budgetText</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Nachricht:</div>
                        <div class='value'>$message</div>
                    </div>
                    <div class='footer'>
                        <p>Diese Anfrage wurde über das Kontaktformular auf threeconnect.com gesendet.</p>
                        <p>Zeitstempel: " . date('d.m.Y H:i:s') . "</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // Alternative für Nicht-HTML-Clients
        $mail->AltBody = "Neue Kontaktanfrage\n\n" .
                        "Name: $name\n" .
                        "E-Mail: $email\n" .
                        "Unternehmen: $company\n" .
                        "Telefon: " . ($phone ?: 'Nicht angegeben') . "\n" .
                        "Gewünschte Leistung: $serviceText\n" .
                        "Budget: $budgetText\n\n" .
                        "Nachricht:\n$message";
        
        // Email senden
        $mail->send();
        
        // Bestätigungsmail an den Absender
        $confirmMail = new PHPMailer(true);
        
        $confirmMail->isSMTP();
        $confirmMail->Host       = SMTP_HOST;
        $confirmMail->SMTPAuth   = true;
        $confirmMail->Username   = SMTP_USER;
        $confirmMail->Password   = SMTP_PASS;
        $confirmMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $confirmMail->Port       = SMTP_PORT;
        $confirmMail->CharSet    = 'UTF-8';
        
        $confirmMail->setFrom(MAIL_FROM, 'Three Connect');
        $confirmMail->addAddress($email, $name);
        
        $confirmMail->isHTML(true);
        $confirmMail->Subject = 'Vielen Dank für Ihre Anfrage bei Three Connect';
        
        $confirmMail->Body = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #0077b6, #00b4d8); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; padding: 12px 30px; background: #00b4d8; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
                .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Three Connect</h1>
                    <p>Vielen Dank für Ihre Anfrage!</p>
                </div>
                <div class='content'>
                    <p>Hallo $name,</p>
                    <p>vielen Dank für Ihr Interesse an unseren Dienstleistungen. Wir haben Ihre Anfrage erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.</p>
                    
                    <h3>Ihre Anfrage im Überblick:</h3>
                    <ul>
                        <li><strong>Gewünschte Leistung:</strong> $serviceText</li>
                        <li><strong>Budget:</strong> $budgetText</li>
                    </ul>
                    
                    <p>In der Zwischenzeit können Sie gerne unsere Website besuchen, um mehr über unsere Leistungen zu erfahren.</p>
                    
                    <center>
                        <a href='https://threeconnect.com' class='button' style='color: white;'>Zur Website</a>
                    </center>
                    
                    <div class='footer'>
                        <p><strong>Three Connect</strong><br>
                        Ihr Partner für digitalen Erfolg<br>
                        E-Mail: info@three-connect.de<br>
                        Tel: +49 173 468 9676</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        ";
        
        $confirmMail->AltBody = "Hallo $name,\n\n" .
                               "vielen Dank für Ihre Anfrage bei Three Connect.\n\n" .
                               "Wir haben Ihre Anfrage erhalten und werden uns bald bei Ihnen melden.\n\n" .
                               "Mit freundlichen Grüßen\n" .
                               "Ihr Three Connect Team";
        
        $confirmMail->send();
        
        // Erfolgreiche Antwort
        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'message' => 'Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei Ihnen!'
        ]);
        
    } catch (Exception $e) {
        // Fehler zurückgeben
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.'
        ]);
    }
    exit;
}

// Wenn keine POST-Anfrage, zur Hauptseite weiterleiten
header("Location: index.html");
exit;
?>