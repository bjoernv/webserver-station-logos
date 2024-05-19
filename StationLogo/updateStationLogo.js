<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="cache-control" content="no-cache">
  <title>Logo Browser</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <style>
/* Stile für das Layout der Vorschau */
body {
  background-color: #0b3d91; /* Dunkelblauer Hintergrund */
  color: white; /* Weiße Schriftfarbe für den Kontrast */
  font-family: Arial, sans-serif;
  line-height: 1.5; /* Größerer Zeilenabstand */
  margin: 0; /* Rand entfernen */
  padding: 0; /* Innenabstand entfernen */
}

/* Stil für das fileCount Element */
#fileCount {
  position: absolute;
  background-color: transparent;
  color: white;
  padding: 5px;
  border: 0px solid white;
  z-index: 9999;
}

/* Media Query für Bildschirme mit einer Breite von mindestens 1350px */
@media only screen and (min-width: 1350px) {
  #fileCount {
    top: 25px;
    right: 200px;
  }
}

/* Media Query für Bildschirme mit einer Breite von höchstens 1350px */
@media only screen and (max-width: 1350px) {
  #fileCount {
    position: absolute; /* Ändere die Positionierung auf relativ */
    top: auto; /* Setze die Positionseigenschaften zurück */
    right: auto;
    margin-top: 20px; /* Füge einen oberen Abstand hinzu */
    margin-left: 25px; /* Füge einen linken Abstand hinzu */
  }
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px; /* Innenabstand hinzufügen */
  box-sizing: border-box; /* Box-Modell-Korrektur */
}
.back-button {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  margin-left: auto; /* Zurück-Button nach rechts schieben */
  margin-right: 50px; /* Weiter nach links verschieben */
  z-index: 2;
}
.back-button:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
.folders-container {
  display: flex; /* Flexbox verwenden */
  flex-wrap: wrap; /* Automatisches Umbruchverhalten */
  justify-content: flex-start; /* Links ausrichten */
  padding: 10px 20px; /* Innenabstand hinzufügen */
  box-sizing: border-box; /* Box-Modell-Korrektur */
  margin-top: 5px; /* Abstand nach oben */
}
.folder-container {
  position: relative;
  width: 180px;
  height: 90px; /* Höhe angepasst für mehr Platz unter dem Ordnernamen */
  margin: -10px 20px 60px 0px; /* Anpassung der linken Margin */
  border-radius: 30px;
  background-color: #130468;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer; /* Cursor beim Überfahren in einen Zeiger ändern */
}

.folder-container:hover { /* Hintergrundfarbe beim Überfahren ändern */
  background-color: rgba(255, 255, 255, 0.1);
}

.folder-container .folder { /* Ordnerinhalt */
  pointer-events: none; /* Klickereignisse für den Ordnerinhalt deaktivieren */
}

.folder-container::before,
.folder-container::after {
  content: ''; /* Pseudoelemente für den Rahmen */
  position: absolute;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  border-radius: 30px; /* Abgerundete Ecken */
  background-color: transparent; /* Transparenter Hintergrund */
  z-index: -1; /* Hinter das Inhaltscontainer setzen */
}

.folder-container:hover::before,
.folder-container:hover::after { /* Rahmen beim Überfahren anzeigen */
  background-color: rgba(255, 255, 255, 0.1); /* Rahmenfarbe */
}

.folder-container::before { /* Rahmen oben */
  top: -1px;
  left: -1px;
}

.folder-container::after { /* Rahmen links */
  top: -1px;
  left: -1px;
}

.folder p {
  color: white; /* Weiße Schriftfarbe für den Ordnername */
  font-size: 22px; /* Pixelgröße des Ordnername */
  margin-top: -10px; /* Innenabstand entfernen */
}

.flag-image {
  margin-top: -20px; /* Abstand zum Ordnernamen */
  width: auto; /* Breite automatisch anpassen */
  height: 30px; /* Höhe der Flagge */
}

.logo-browser {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* Logos linksbündig ausrichten */
  align-items: flex-start; /* Logos oben ausrichten */
  margin-top: -40px; /* Kein zusätzlicher Abstand nach oben */
  margin-left: -30px; /* Negative Margin, um den Überschuss auszugleichen */
  padding: 10px 20px; /* Innenabstand hinzufügen */
  box-sizing: border-box; /* Box-Modell-Korrektur */
}

.logo-container {
  position: relative;
  width: 180px;
  height: 90px;
  margin: 30px 20px 60px 20px; /* Reduzierte Seitenabstände */
  border-radius: 30px;
  background-color: #130468;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.logo-container:hover {
  background-color: rgba(0, 0, 0, 0.3); /* Neue Hintergrundfarbe beim Überfahren */
}

.logo-container.hovered {
  background-color: green !important; /* Hier den gewünschten Hintergrundfarbwert einfügen */
}

.logo-container img {
  margin-top: 80px;
  width: auto;
  height: 60px;
  min-height: 60px; /* Mindesthöhe des Containers */
  max-height: 100%;
  max-width: 140px;
  object-fit: contain;
}

.logo-info {
  position: absolute;
  bottom: 5px;
  left: 0; /* Positioniert die Metadaten am linken Rand */
  width: 100%; /* Füllt den gesamten Container */
  color: white;
  text-align: center; /* Zentriert den Text horizontal */
}

.logo-info p {
  margin: 5px 0; /* Innenabstand für einzelne Absätze */
}

.logo-container p {
  margin: 1px; /* Abstand zum Bild */
  font-size: 12px;
}
.filename {
  font-size: 12px; /* Dateiname größer anzeigen */
}
.image-size-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.file-size {
  margin-left: auto;
}

/* Media Query für kleine Bildschirme */
@media only screen and (min-width: 1350px) {
/* Schaltflächen für Farbauswahl */
.color-buttons {
  display: flex;
  justify-content: center;
  margin-top: -10px; /* Anpassung des Abstands nach oben */
  margin-left: -50px;
  position: absolute; /* Absolute Positionierung */
  width: 100%; /* Breite auf 100% setzen */
  z-index: 1; /* Über der Logo-Browser-Div positionieren */
}
  }

.color-button {
  width: 80px;
  height: 30px;
  margin: 0 5px;
  border: 1px solid white; /* Schwarzer Rand */
  border-radius: 0%;
  cursor: pointer;
  outline: none;
  color: white; /* Schriftfarbe auf Weiß setzen */
}

/* Media Query für kleine Bildschirme */
@media only screen and (max-width: 1350px) {
  .container {
    flex-direction: column; /* Spaltenlayout für kleine Bildschirme */
    align-items: flex-start; /* Elemente links ausrichten */
  }

  .color-buttons {
    position: static; /* Position auf statisch ändern */
    margin-top: 10px; /* Abstand nach oben hinzufügen */
  }

  .back-button {
    margin: 10px 0; /* Abstand oben und unten hinzufügen */
  }
}

</style>
</head>
<body>
  <div class="container">
    <h1>Logo Browser</h1> <!-- Hier wird der Ordnername dynamisch eingefügt -->
	<!-- Farbauswahl-Buttons -->
<div class="color-buttons">
  <button class="color-button" data-color="#1E2928" style="background-color: #1E2928;">Cappuccino</button>
  <button class="color-button" data-color="#1A1E11" style="background-color: #1A1E11;">Nature</button>
  <button class="color-button" data-color="#112726" style="background-color: #112726;">Ocean</button>
  <button class="color-button" data-color="#221909" style="background-color: #221909;">Terminal</button>
  <button class="color-button" data-color="#2C0D23" style="background-color: #2C0D23;">Nightlife</button>
  <button class="color-button" data-color="#131025" style="background-color: #131025;">Purple</button>
  <button class="color-button" data-color="#0A0A0A" style="background-color: #0A0A0A;">Amoled</button>
</div>
    <a href="#" class="back-button" id="backButton" style="display: none;">Back</a>
  </div>

  <div class="folders-container" id="folderStructure">
  </div>

  <div class="logo-browser" id="logoBrowser" style="display: none;">

    <!-- Hier werden die Vorschauen der Logos automatisch generiert -->
  </div>
  
  <div id="flagResult"></div> <!-- Hier werden die Flaggen angezeigt -->
  <div id="fileCount"></div>
  
   <!-- JavaScript-Code -->
 <script>
// Globale Variable, um den ausgewählten Farbwert zu speichern
let selectedColor = '';

// Die Liste der Länder und ihrer ITU-Codes
const countryList = [
    { itu_code: 'AFG', country_code: 'af', country: 'Afghanistan' },
    { itu_code: 'ALB', country_code: 'al', country: 'Albania' },
    { itu_code: 'ALG', country_code: 'dz', country: 'Algeria' },
    { itu_code: 'AND', country_code: 'ad', country: 'Andorra' },
    { itu_code: 'AGL', country_code: 'ao', country: 'Angola' },
    { itu_code: 'ATG', country_code: 'ag', country: 'Antigua and Barbuda' },
    { itu_code: 'ARG', country_code: 'ar', country: 'Argentina' },
    { itu_code: 'ARM', country_code: 'am', country: 'Armenia' },
    { itu_code: 'AUS', country_code: 'au', country: 'Australia' },
    { itu_code: 'AUT', country_code: 'at', country: 'Austria' },
    { itu_code: 'AZE', country_code: 'az', country: 'Azerbaijan' },
    { itu_code: 'BAH', country_code: 'bs', country: 'Bahamas' },
    { itu_code: 'BGD', country_code: 'bd', country: 'Bangladesh' },
    { itu_code: 'BRB', country_code: 'bb', country: 'Barbados' },
    { itu_code: 'BLR', country_code: 'by', country: 'Belarus' },
    { itu_code: 'BEL', country_code: 'be', country: 'Belgium' },
    { itu_code: 'BLZ', country_code: 'bz', country: 'Belize' },
    { itu_code: 'BEN', country_code: 'bj', country: 'Benin' },
    { itu_code: 'BTN', country_code: 'bt', country: 'Bhutan' },
    { itu_code: 'BOL', country_code: 'bo', country: 'Bolivia' },
    { itu_code: 'BIH', country_code: 'ba', country: 'Bosnia and Herzegovina' },
    { itu_code: 'BOT', country_code: 'bw', country: 'Botswana' },
    { itu_code: 'BRM', country_code: 'br', country: 'Brazil' },
    { itu_code: 'BRU', country_code: 'bn', country: 'Brunei Darussalam' },
    { itu_code: 'BUL', country_code: 'bg', country: 'Bulgaria' },
    { itu_code: 'BDI', country_code: 'bi', country: 'Burundi' },
    { itu_code: 'CBG', country_code: 'kh', country: 'Cambodia' },
    { itu_code: 'CME', country_code: 'cm', country: 'Cameroon' },
    { itu_code: 'CAN', country_code: 'ca', country: 'Canada' },
    { itu_code: 'CPV', country_code: 'cv', country: 'Cape Verde' },
    { itu_code: 'CAF', country_code: 'cf', country: 'Central African Republic' },
    { itu_code: 'TCD', country_code: 'td', country: 'Chad' },
    { itu_code: 'CHL', country_code: 'cl', country: 'Chile' },
    { itu_code: 'CHN', country_code: 'cn', country: 'China' },
    { itu_code: 'CLM', country_code: 'co', country: 'Colombia' },
    { itu_code: 'COM', country_code: 'km', country: 'Comoros' },
    { itu_code: 'COG', country_code: 'cg', country: 'Congo' },
    { itu_code: 'COD', country_code: 'cd', country: 'Congo' },
    { itu_code: 'CTR', country_code: 'cr', country: 'Costa Rica' },
    { itu_code: 'HRV', country_code: 'hr', country: 'Croatia' },
    { itu_code: 'CUB', country_code: 'cu', country: 'Cuba' },
    { itu_code: 'CYP', country_code: 'cy', country: 'Cyprus' },
    { itu_code: 'CZE', country_code: 'cz', country: 'Czech Republic' },
    { itu_code: 'D', country_code: 'de', country: 'Germany' },
    { itu_code: 'DJI', country_code: 'dj', country: 'Djibouti' },
    { itu_code: 'DMA', country_code: 'dm', country: 'Dominica' },
    { itu_code: 'DNK', country_code: 'dk', country: 'Denmark' },
    { itu_code: 'DOM', country_code: 'do', country: 'Dominican Republic' },
    { itu_code: 'EQA', country_code: 'ec', country: 'Ecuador' },
    { itu_code: 'EGY', country_code: 'eg', country: 'Egypt' },
    { itu_code: 'ERI', country_code: 'er', country: 'Eritrea' },
    { itu_code: 'EST', country_code: 'ee', country: 'Estonia' },
    { itu_code: 'ETH', country_code: 'et', country: 'Ethiopia' },
    { itu_code: 'F', country_code: 'fr', country: 'France' },
    { itu_code: 'FIN', country_code: 'fi', country: 'Finland' },
    { itu_code: 'FJI', country_code: 'fj', country: 'Fiji' },
    { itu_code: 'FSM', country_code: 'fm', country: 'Micronesia' },
    { itu_code: 'G', country_code: 'gb', country: 'United Kingdom' },
    { itu_code: 'GAB', country_code: 'ga', country: 'Gabon' },
    { itu_code: 'GEO', country_code: 'ge', country: 'Georgia' },
    { itu_code: 'GHA', country_code: 'gh', country: 'Ghana' },
    { itu_code: 'GMB', country_code: 'gm', country: 'Gambia' },
    { itu_code: 'GNB', country_code: 'gw', country: 'Guinea-Bissau' },
    { itu_code: 'GNE', country_code: 'gq', country: 'Equatorial Guinea' },
    { itu_code: 'GRC', country_code: 'gr', country: 'Greece' },
    { itu_code: 'GRD', country_code: 'gd', country: 'Grenada' },
    { itu_code: 'GTM', country_code: 'gt', country: 'Guatemala' },
    { itu_code: 'GUI', country_code: 'gn', country: 'Guinea' },
    { itu_code: 'GUY', country_code: 'gy', country: 'Guyana' },
    { itu_code: 'HND', country_code: 'hn', country: 'Honduras' },
    { itu_code: 'HNG', country_code: 'hu', country: 'Hungary' },
    { itu_code: 'HOL', country_code: 'nl', country: 'Netherlands' },
    { itu_code: 'HRV', country_code: 'hr', country: 'Croatia' },
    { itu_code: 'HTI', country_code: 'ht', country: 'Haiti' },
    { itu_code: 'NL', country_code: 'nl', country: 'Netherlands' },
    { itu_code: 'ISL', country_code: 'is', country: 'Iceland' },
    { itu_code: 'IND', country_code: 'in', country: 'India' },
    { itu_code: 'IDN', country_code: 'id', country: 'Indonesia' },
    { itu_code: 'IRN', country_code: 'ir', country: 'Iran' },
    { itu_code: 'IRQ', country_code: 'iq', country: 'Iraq' },
    { itu_code: 'IRL', country_code: 'ie', country: 'Ireland' },
    { itu_code: 'ISR', country_code: 'il', country: 'Israel' },
    { itu_code: 'I', country_code: 'it', country: 'Italy' },
    { itu_code: 'JAM', country_code: 'jm', country: 'Jamaica' },
    { itu_code: 'J', country_code: 'jp', country: 'Japan' },
    { itu_code: 'JOR', country_code: 'jo', country: 'Jordan' },
    { itu_code: 'KAZ', country_code: 'kz', country: 'Kazakhstan' },
    { itu_code: 'KEN', country_code: 'ke', country: 'Kenya' },
    { itu_code: 'KIR', country_code: 'ki', country: 'Kiribati' },
    { itu_code: 'KGZ', country_code: 'kg', country: 'Kyrgyzstan' },
    { itu_code: 'KWT', country_code: 'kw', country: 'Kuwait' },
    { itu_code: 'LBN', country_code: 'lb', country: 'Lebanon' },
    { itu_code: 'LBR', country_code: 'lr', country: 'Liberia' },
    { itu_code: 'LBY', country_code: 'ly', country: 'Libya' },
    { itu_code: 'LIE', country_code: 'li', country: 'Liechtenstein' },
    { itu_code: 'LTU', country_code: 'lt', country: 'Lithuania' },
    { itu_code: 'LUX', country_code: 'lu', country: 'Luxembourg' },
    { itu_code: 'LVA', country_code: 'lv', country: 'Latvia' },
    { itu_code: 'LAO', country_code: 'la', country: 'Laos' },
    { itu_code: 'MDV', country_code: 'mv', country: 'Maldives' },
    { itu_code: 'MLI', country_code: 'ml', country: 'Mali' },
    { itu_code: 'MLT', country_code: 'mt', country: 'Malta' },
    { itu_code: 'MHL', country_code: 'mh', country: 'Marshall Islands' },
    { itu_code: 'MRT', country_code: 'mr', country: 'Mauritania' },
    { itu_code: 'MUS', country_code: 'mu', country: 'Mauritius' },
    { itu_code: 'MEX', country_code: 'mx', country: 'Mexico' },
    { itu_code: 'MDA', country_code: 'md', country: 'Moldova' },
    { itu_code: 'MCO', country_code: 'mc', country: 'Monaco' },
    { itu_code: 'MNG', country_code: 'mn', country: 'Mongolia' },
    { itu_code: 'MNE', country_code: 'me', country: 'Montenegro' },
    { itu_code: 'MAR', country_code: 'ma', country: 'Morocco' },
    { itu_code: 'MOZ', country_code: 'mz', country: 'Mozambique' },
    { itu_code: 'MYA', country_code: 'mm', country: 'Myanmar' },
    { itu_code: 'NAM', country_code: 'na', country: 'Namibia' },
    { itu_code: 'NRU', country_code: 'nr', country: 'Nauru' },
    { itu_code: 'NPL', country_code: 'np', country: 'Nepal' },
    { itu_code: 'NZL', country_code: 'nz', country: 'New Zealand' },
    { itu_code: 'NIC', country_code: 'ni', country: 'Nicaragua' },
    { itu_code: 'NGR', country_code: 'ne', country: 'Niger' },
    { itu_code: 'NGA', country_code: 'ng', country: 'Nigeria' },
    { itu_code: 'MKD', country_code: 'mk', country: 'North Macedonia' },
    { itu_code: 'NOR', country_code: 'no', country: 'Norway' },
    { itu_code: 'OMN', country_code: 'om', country: 'Oman' },
    { itu_code: 'PAK', country_code: 'pk', country: 'Pakistan' },
    { itu_code: 'PLW', country_code: 'pw', country: 'Palau' },
    { itu_code: 'PMA', country_code: 'pa', country: 'Panama' },
    { itu_code: 'PNG', country_code: 'pg', country: 'Papua New Guinea' },
    { itu_code: 'PRY', country_code: 'py', country: 'Paraguay' },
    { itu_code: 'PER', country_code: 'pe', country: 'Peru' },
    { itu_code: 'PHL', country_code: 'ph', country: 'Philippines' },
    { itu_code: 'POL', country_code: 'pl', country: 'Poland' },
    { itu_code: 'POR', country_code: 'pt', country: 'Portugal' },
    { itu_code: 'QAT', country_code: 'qa', country: 'Qatar' },
	{ itu_code: 'RKS', country_code: 'xk', country: 'Kosovo' },
    { itu_code: 'ROU', country_code: 'ro', country: 'Romania' },
    { itu_code: 'RUS', country_code: 'ru', country: 'Russia' },
    { itu_code: 'RWA', country_code: 'rw', country: 'Rwanda' },
    { itu_code: 'SKN', country_code: 'kn', country: 'Saint Kitts and Nevis' },
    { itu_code: 'LCA', country_code: 'lc', country: 'Saint Lucia' },
    { itu_code: 'VCT', country_code: 'vc', country: 'Saint Vincent and the Grenadines' },
    { itu_code: 'SAM', country_code: 'ws', country: 'Samoa' },
    { itu_code: 'SMR', country_code: 'sm', country: 'San Marino' },
    { itu_code: 'STP', country_code: 'st', country: 'Sao Tome and Principe' },
    { itu_code: 'SAU', country_code: 'sa', country: 'Saudi Arabia' },
    { itu_code: 'SEN', country_code: 'sn', country: 'Senegal' },
    { itu_code: 'SRB', country_code: 'rs', country: 'Serbia' },
    { itu_code: 'SEY', country_code: 'sc', country: 'Seychelles' },
    { itu_code: 'SLE', country_code: 'sl', country: 'Sierra Leone' },
    { itu_code: 'SIN', country_code: 'sg', country: 'Singapore' },
    { itu_code: 'SVK', country_code: 'sk', country: 'Slovakia' },
    { itu_code: 'SVN', country_code: 'si', country: 'Slovenia' },
    { itu_code: 'SLB', country_code: 'sb', country: 'Solomon Islands' },
    { itu_code: 'SOM', country_code: 'so', country: 'Somalia' },
    { itu_code: 'RSA', country_code: 'za', country: 'South Africa' },
    { itu_code: 'SSD', country_code: 'ss', country: 'South Sudan' },
    { itu_code: 'E', country_code: 'es', country: 'Spain' },
    { itu_code: 'CLN', country_code: 'lk', country: 'Sri Lanka' },
    { itu_code: 'SDN', country_code: 'sd', country: 'Sudan' },
    { itu_code: 'SUR', country_code: 'sr', country: 'Suriname' },
    { itu_code: 'SWZ', country_code: 'sz', country: 'Swaziland' },
    { itu_code: 'SWE', country_code: 'se', country: 'Sweden' },
    { itu_code: 'SUI', country_code: 'ch', country: 'Switzerland' },
    { itu_code: 'SYR', country_code: 'sy', country: 'Syria' },
    { itu_code: 'TWN', country_code: 'tw', country: 'Taiwan' },
    { itu_code: 'TJK', country_code: 'tj', country: 'Tajikistan' },
    { itu_code: 'TZA', country_code: 'tz', country: 'Tanzania' },
    { itu_code: 'THA', country_code: 'th', country: 'Thailand' },
    { itu_code: 'TLS', country_code: 'tl', country: 'Timor-Leste' },
    { itu_code: 'TOG', country_code: 'tg', country: 'Togo' },
    { itu_code: 'TON', country_code: 'to', country: 'Tonga' },
    { itu_code: 'TTO', country_code: 'tt', country: 'Trinidad and Tobago' },
    { itu_code: 'TUN', country_code: 'tn', country: 'Tunisia' },
    { itu_code: 'TUR', country_code: 'tr', country: 'Turkey' },
    { itu_code: 'TKM', country_code: 'tm', country: 'Turkmenistan' },
    { itu_code: 'TUV', country_code: 'tv', country: 'Tuvalu' },
    { itu_code: 'UGA', country_code: 'ug', country: 'Uganda' },
    { itu_code: 'UKR', country_code: 'ua', country: 'Ukraine' },
    { itu_code: 'UAE', country_code: 'ae', country: 'United Arab Emirates' },
    { itu_code: 'USA', country_code: 'us', country: 'United States of America' },
    { itu_code: 'URU', country_code: 'uy', country: 'Uruguay' },
    { itu_code: 'UZB', country_code: 'uz', country: 'Uzbekistan' },
    { itu_code: 'VUT', country_code: 'vu', country: 'Vanuatu' },
    { itu_code: 'VTC', country_code: 'va', country: 'Vatican City' },
    { itu_code: 'VEN', country_code: 've', country: 'Venezuela' },
    { itu_code: 'VNM', country_code: 'vn', country: 'Vietnam' },
    { itu_code: 'YEM', country_code: 'ye', country: 'Yemen' },
    { itu_code: 'ZMB', country_code: 'zm', country: 'Zambia' },
    { itu_code: 'ZWE', country_code: 'zw', country: 'Zimbabwe' }
    // Füge weitere Länder hier hinzu...
];

// Funktion zum Ermitteln der Flagge anhand des Ordner-Namens
function getFlagByFolderName(folderName) {
    const countryData = countryList.find(country => country.itu_code === folderName.toUpperCase());
    
    if (countryData) {
        const flagUrl = `https://flagcdn.com/w80/${countryData.country_code}.png`;
        const flagImg = document.createElement('img');
        flagImg.src = flagUrl;
        flagImg.alt = `${countryData.country} Flagge`;
        flagImg.classList.add('flag-image'); // Klasse hinzufügen
        return flagImg;
    } else {
        console.error('Land nicht gefunden für Ordner:', folderName);
        return null;
    }
}


async function showImagesInFolder(folderPath, folderName) {
  try {
    const response = await fetch(folderPath, { cache: 'no-cache' });
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const imageLinks = doc.querySelectorAll('a[href$=".svg"], a[href$=".png"]');

    const logoBrowser = document.getElementById('logoBrowser');
    logoBrowser.style.display = 'flex'; // Browser anzeigen
    logoBrowser.innerHTML = ''; // Browser leeren

    for (const link of imageLinks) {
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('logo-container'); // Klasse hinzufügen
      imgContainer.style.backgroundColor = selectedColor; // Hintergrundfarbe setzen

      const img = document.createElement('img');
      const filename = document.createElement('p');
      const imageSizeContainer = document.createElement('div');
      const imageSize = document.createElement('p');
      const fileSize = document.createElement('p');
      const filenameText = document.createTextNode(link.textContent.trim());

      // Dateiname hinzufügen
      filename.appendChild(filenameText);
      filename.classList.add('filename'); // Klasse für Dateiname hinzufügen

      // Eventlistener hinzufügen, um die Pixelgröße nach dem Laden des Bildes anzuzeigen
      img.addEventListener('load', async function() {
        imageSize.textContent = `${img.naturalWidth} x ${img.naturalHeight}`; // Pixelgröße anzeigen

        // Dateigröße berechnen
        const blob = await fetch(img.src, { cache: 'no-cache' }).then(r => r.blob());
        const fileSizeKB = Math.ceil(blob.size / 1024);
        fileSize.textContent = `${fileSizeKB} KB`;

        imageSizeContainer.appendChild(imageSize);
        imageSizeContainer.appendChild(fileSize);
      });

      img.src = folderPath + link.textContent.trim();
      img.alt = link.textContent.trim();

      imgContainer.appendChild(img); // Bild dem Container hinzufügen
      imgContainer.appendChild(document.createElement('br')); // Leerzeile einfügen
      imgContainer.appendChild(filename); // Dateiname dem Container hinzufügen
      imgContainer.appendChild(imageSizeContainer); // Größe und Dateigröße dem Container hinzufügen

      logoBrowser.appendChild(imgContainer);
    }

    // Titel aktualisieren, um die Flagge anzuzeigen
    const flagImg = getFlagByFolderName(folderName);
    if (flagImg) {
      const flagContainer = document.createElement('div'); // Container für die Flagge erstellen
      flagContainer.classList.add('flag-container');
      flagContainer.style.position = 'absolute';
      flagContainer.style.top = '55px';
      flagContainer.style.left = '250px';
      flagContainer.style.width = '50px'; // Feste Breite für den Container festlegen
      flagContainer.style.zIndex = '1000'; // Sicherstellen, dass die Flagge oben bleibt

      flagImg.style.width = '100%'; // Flagge an Containerbreite anpassen
      flagContainer.appendChild(flagImg); // Flagge dem Container hinzufügen

      document.body.appendChild(flagContainer); // Flaggencontainer zum body hinzufügen

      // Setze den Titeltext im h1-Element
      const h1 = document.querySelector('h1');
      h1.textContent = 'Logo Browser';
    } else {
      document.querySelector('h1').textContent = 'Logo Browser'; // Wenn keine Flagge gefunden wurde, nur "Logo Browser" anzeigen
    }
  } catch (error) {
    console.error('Fehler beim Abrufen und Anzeigen der Bilder:', error);
  }
}






// Funktion zum Abrufen der Ordnerstruktur und Erstellen der Baumansicht
async function fetchFolderStructure() {
  try {
    const response = await fetch('https://tef.noobish.eu/logos/', { cache: 'no-cache' });
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const folders = doc.querySelectorAll('a[href$="/"]');

    const foldersArray = Array.from(folders)
      .map(folder => ({
        name: folder.textContent.trim().replace('/', ''),
        path: folder.getAttribute('href')
      }))
      .filter(folder => folder.name !== 'scripts' && folder.name !== 'images' && folder.name !== 'Parent Directory');

    const folderStructure = document.getElementById('folderStructure');
    folderStructure.innerHTML = ''; // Vor dem Erstellen der Ordnerstruktur den Inhalt leeren

    foldersArray.forEach(folder => {
      const folderContainer = document.createElement('div');
      folderContainer.classList.add('folder-container');
      folderContainer.style.backgroundColor = selectedColor; // Hintergrundfarbe setzen
      folderContainer.addEventListener('click', async () => {
        const backButton = document.getElementById('backButton');
        backButton.style.display = 'block'; // Zurück-Button anzeigen
        folderStructure.style.display = 'none'; // Ordnerstruktur ausblenden

        await showImagesInFolder(`https://tef.noobish.eu/logos/${folder.path}`, folder.name);
      });

      const folderElement = document.createElement('div');
      folderElement.classList.add('folder');
      folderElement.innerHTML = `<p>${folder.name}</p>`;

      folderContainer.appendChild(folderElement);
      folderStructure.appendChild(folderContainer);

      // Hintergrundfarbe für Folder-Container beim Hover aktualisieren
      folderContainer.addEventListener('mouseenter', () => {
        folderContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      });
      folderContainer.addEventListener('mouseleave', () => {
        folderContainer.style.backgroundColor = selectedColor;
      });
	  // Anzeige der Flagge entsprechend dem ITU-Code des Ordners
      const flagImg = getFlagByFolderName(folder.name);
      if (flagImg) {
          folderContainer.appendChild(flagImg);
      }
    });
  } catch (error) {
    console.error('Fehler beim Abrufen und Anzeigen der Ordnerstruktur:', error);
  }
}

// Die Funktion zum Abrufen und Anzeigen der Ordnerstruktur aufrufen, wenn die Seite geladen ist
window.onload = fetchFolderStructure;

// Eventlistener für die Farbauswahl hinzufügen
document.querySelectorAll('.color-button').forEach(button => {
  button.addEventListener('click', function() {
    selectedColor = this.dataset.color; // Ausgewählte Farbe festlegen
    // Farbe für alle Logo-Container festlegen
    document.querySelectorAll('.logo-container').forEach(container => {
      container.style.backgroundColor = selectedColor;
    });
    // Farbe für alle Folder-Container festlegen
    document.querySelectorAll('.folder-container').forEach(container => {
      container.style.backgroundColor = selectedColor;
    });
    // Hintergrundfarbe für die gesamte Webseite festlegen
    document.body.style.backgroundColor = selectedColor;
    // Hintergrundfarben für die Farbauswahl-Buttons festlegen
    document.querySelectorAll('.color-button').forEach(btn => {
      btn.style.backgroundColor = btn.dataset.color;
    });
  });
});

// Eventlistener für den Zurück-Button hinzufügen
document.getElementById('backButton').addEventListener('click', () => {
  document.getElementById('backButton').style.display = 'none'; // Zurück-Button ausblenden
  document.getElementById('folderStructure').style.display = 'flex'; // Ordnerstruktur wieder anzeigen
  document.getElementById('logoBrowser').style.display = 'none'; // Browser ausblenden
  fetchFolderStructure(); // Ordnerstruktur neu laden

  // Titel aktualisieren, um den Ordnername auszublenden
  document.querySelector('h1').textContent = 'Logo Browser';

  // Die ausgewählte Farbe erneut anwenden
  document.querySelectorAll('.logo-container').forEach(container => {
    container.style.backgroundColor = selectedColor;
  });
  document.querySelectorAll('.folder-container').forEach(container => {
    container.style.backgroundColor = selectedColor;
  });
});

// Eventlistener für die Farbauswahl hinzufügen
document.querySelectorAll('.color-button').forEach(button => {
  button.addEventListener('click', function() {
    const selectedColor = this.dataset.color; // Ausgewählte Farbe festlegen
    // Farbe für alle Logo-Container festlegen
    document.querySelectorAll('.logo-container').forEach(container => {
      container.style.backgroundColor = selectedColor;
    });
    // Farbe für alle Folder-Container festlegen
    document.querySelectorAll('.folder-container').forEach(container => {
      container.style.backgroundColor = selectedColor;
    });
    // Hintergrundfarbe für die gesamte Webseite festlegen
    const bodyColors = {
      "#1E2928": "#152021",   // Cappuccino
      "#1A1E11": "#12120C",   // Nature
      "#112726": "#0C1C1B",   // Ocean
      "#221909": "#171106",   // Terminal
      "#2C0D23": "#21091D",   // Nightlife
      "#131025": "#0D0B1A",   // Purple
      "#0A0A0A": "#000000"    // Amoled
    };
    document.body.style.backgroundColor = bodyColors[selectedColor]; // Hintergrundfarbe der Webseite setzen
  });
});

var totalCount = 0;
var totalFolders = 0;
var foldersToCheck = ["https://tef.noobish.eu/logos/"];

// Funktion zum Zählen der SVG- und PNG-Dateien sowie der Ordner rekursiv
function countFiles() {
    var folder = foldersToCheck.pop();
    if (!folder) {
        $("#fileCount").html;
        return;
    }
    console.log("Überprüfe Ordner: " + folder);
    
    $.ajax({
        url: folder,
        success: function(data) {
            $(data).find('a').each(function() {
                var link = $(this).attr('href');
                // Korrigiere den Ordnerpfad, wenn nötig
                if (link.charAt(0) === '/') {
                    link = link.slice(1); // Entferne führenden Schrägstrich
                }
                if (link === '../' || link === 'scripts/' || link === 'images/') return; // Verhindere Endlosschleife und ignoriere bestimmte Ordner
                var itemUrl = folder + link;
                if (link.charAt(link.length - 1) === '/') {
                    foldersToCheck.push(itemUrl);
                    totalFolders++;
                    console.log("Neuer Ordner hinzugefügt: " + itemUrl);
                } else if (link.endsWith('.svg') || link.endsWith('.png')) {
                    totalCount++;
                }
            });
            countFiles();
        },
        error: function(xhr, status, error) {
            console.error("Fehler beim Abrufen des Ordners " + folder + ": " + error);
            countFiles(); // Fortsetzen mit dem nächsten Ordner, auch wenn ein Fehler aufgetreten ist
        }
    });
}

// Rufe die Funktion zum Zählen der Dateien und Ordner auf
$(document).ready(function() {
    countFiles();
});

$(document).ajaxStop(function() {
    totalFolders /= 2;
	totalCount -= 2;
    $("#fileCount").html("Logos: " + totalCount + "<br>Countries: " + totalFolders);
});

// Füge die Gesamtanzahl der Dateien am oberen Rand neben dem Farbumschalter ein
$(document).ready(function() {
    var fileCountHTML = "<div id='fileCount' style='position: absolute; top: 25px; right: 0px; background-color: transparent; color: white; padding: 5px; border: 0px solid white; z-index: 9999;'</div>";
    document.body.insertAdjacentHTML('beforeend', fileCountHTML);
    $("body").append(fileCountHTML);
});



</script>

</body>
</html>
