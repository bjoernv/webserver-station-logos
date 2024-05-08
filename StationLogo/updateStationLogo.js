//////////////////////////////////////////////////////////////////////////////////////
///                                                                                ///
///  STATION LOGO INSERT SCRIPT FOR FM-DX-WEBSERVER (V3.11)                        ///
///                                                                                /// 
///  Thanks to Ivan_FL, Adam W, mc_popa & noobish for the ideas and design!  	   ///
///                                                                                ///
///  New Logo Files (png/svg) and Feedback are welcome!                            ///
///  73! Highpoint                                                                 ///
///                                                          last update: 08.05.24 ///
//////////////////////////////////////////////////////////////////////////////////////


//////////////// Inject Logo Code for Desktop Devices ////////////////////////

// Define the HTML code as a string for Logo Container
var LogoContainerHtml = '<div style="width: 5%;"></div> <!-- Spacer -->' +
    '<div class="panel-30 m-0 hide-phone" style="width: 48%" >' +
    '    <div id="logo-container-desktop" style="width: auto; height: 60px; display: flex; justify-content: center; align-items: center; margin: auto;">' +
    '        <img id="station-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC" alt="station-logo-desktop" style="max-width: 140px; padding: 1px 2px; max-height: 100%; margin-top: 30px; display: block; cursor: pointer;">' +
    '    </div>' +
    '</div>';
// Insert the new HTML code after the named <div>
document.getElementById("ps-container").insertAdjacentHTML('afterend', LogoContainerHtml);

// The new HTML for the div element with the Play / Stop button
var buttonHTML = '<div class="panel-10 no-bg h-100 m-0 m-right-20 hide-phone" style="width: 80px;margin-right: 20px !important;">' +
                     '<button class="playbutton" aria-label="Play / Stop Button"><i class="fa-solid fa-play fa-lg"></i></button>' +
                  '</div>';
// Select the original div element
var originalDiv = document.querySelector('.panel-10');
// Create a new div element
var buttonDiv = document.createElement('div');
buttonDiv.innerHTML = buttonHTML;
// Replace the original div element with the new HTML
originalDiv.outerHTML = buttonDiv.outerHTML;

//////////////// Inject Logo Code for Mobile Devices ////////////////////////

// Select the existing <div> element with the ID "flags-container-phone"
var flagsContainerPhone = document.getElementById('flags-container-phone');

// Create the new HTML for the replacement
var MobileHTML = `
    <div id="flags-container-phone" class="panel-33">
        <h2 class="show-phone">	
            <div id="logo-container-phone" style="width: auto; height: 70px; display: flex; justify-content: center; align-items: center; margin: auto;">                 
                <img id="station-logo-phone" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC" alt="station-logo-phone" style="max-width: 160px; padding: 1px 2px; max-height: 100%; margin-top: 0px; display: block;">	
            </div>
            <br>
            <div class="data-pty text-color-default"></div>
        </h2>
		<h3 style="margin-top:0;margin-bottom:0;" class="color-4 flex-center">
                <span class="data-tp">TP</span>
                <span style="margin-left: 15px;" class="data-ta">TA</span>
                <div style="display:inline-block">
                    <span style="margin-left: 20px;display: block;margin-top: 2px;" class="data-flag"></span>
                </div>
                <span class="pointer stereo-container" style="position: relative;">
                    <span style="margin-left: 20px;" class="data-st">ST</span>
                    <span class="overlay tooltip" data-tooltip="Stereo / Mono toggle. <br><strong>Click to toggle."></span>
                </span>
                <span style="margin-left: 15px;" class="data-ms">MS</span>
		</h3>
    </div>
`;

// Replace the HTML content of the <div> element with the new HTML code
flagsContainerPhone.innerHTML = MobileHTML;

// Display the Logo //

const serverpath = 'https://tef.noobish.eu/logos/';
const localpath = '/logos/';
const defaultServerPath = serverpath + 'default-logo.png';
const emptyServerPath = serverpath + 'empty-logo.png';

// Determine the logo image element based on device type
var logoImage;
if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    logoImage = $('#station-logo-phone');
} else {
    logoImage = $('#station-logo');
}

// Set interval to check PI code
setInterval(CheckPI, 200);

// Function to check PI code
function CheckPI() {
    const piCodeContainer = $('#data-pi');
    const piCode = piCodeContainer.text().trim().replace(/[?]{1,2}/g, '').toUpperCase();
    const tooltipContainer = $('.panel-30');

    // Check if PI code is empty or contains '?' characters
    if (piCode === '' || piCode.includes('?')) {
        tooltipContainer.css('background-color', '');
        logoImage.attr('src', defaultServerPath).attr('alt', 'Default Logo');
        logoImage.css('cursor', 'default'); 
        tooltipContainer.off('click'); // Klickereignis entfernen
        window.piCode = '';
        window.ituCode = '';
	window.previousSender = '';
	window.previousFrequency = '';
		
    } else {
        updateStationLogo(piCode);
    }
}

// Function to update station logo
function updateStationLogo(piCode) {
    const ituCode = $('#data-station-itu').text().trim();
    const tooltipContainer = $('.panel-30');

    // Check if PI code or ITU code has changed
    if (piCode !== window.piCode || ituCode !== window.ituCode ) {

        window.piCode = piCode;
        window.ituCode = ituCode;
        console.log(`piCode: ${piCode}`);
        console.log(`ituCode: ${ituCode}`);

        // Define paths for logo images
        const paths = [
            `${localpath}${piCode}`,
            `${serverpath}${ituCode}/${piCode}`
        ];

        const supportedExtensions = ['png', 'svg', 'gif']; // List of supported file extensions

        let found = false;

        // Function to check each path for logo image
        function checkNextPath(index) {
            if (found || index >= paths.length) {
                if (!found) {
                    logoImage.attr('src', emptyServerPath).attr('alt', 'Empty Logo').off('click');
                    logoImage.css('cursor', 'default');
                    LogoSearch(piCode, found); // Call LogoSearch with found = false if no logo is found
                }
                return;
            }

            const path = paths[index];

            // Function to check each extension for logo image
            function checkNextExtension(extensionIndex) {
                if (found || extensionIndex >= supportedExtensions.length) {
                    if (!found) {
                        checkNextPath(index + 1); // If no supported extension found, move to the next path
                    }
                    return;
                }

                const xhr = new XMLHttpRequest();
                xhr.open('HEAD', `${path}.${supportedExtensions[extensionIndex]}`, true);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        console.log(`Downloading image from ${path}.${supportedExtensions[extensionIndex]}`);
                        logoImage.attr('src', `${path}.${supportedExtensions[extensionIndex]}`).attr('alt', `Logo for station ${piCode}`).css('display', 'block');
                        found = true;
                        LogoSearch(piCode, found); // Call LogoSearch with found = true if logo is found
                    } else if (xhr.status === 404) {
                        checkNextExtension(extensionIndex + 1); // Try next extension if file not found
                    }
                };
                xhr.onerror = function () { // Handling error cases
                    checkNextExtension(extensionIndex + 1); // Try next extension
                };
                xhr.send();
				
            }

            checkNextExtension(0); // Start checking extensions
        }

        checkNextPath(0); // Start checking paths
    }
	
}

// Function for logo search
function LogoSearch(piCode, found) {
    var previousPiCode = ''; // Global variable to store the previous piCode
	var currentStation = ''; // Global variable to store the currentStation
	var currentFrequency = ''; // Global variable to store the currentFrequency

    const currentPiCode = piCode; // Get the current piCode
    const tooltipContainer = $('.panel-30');
    tooltipContainer.css('background-color', '').off('click').css('cursor', 'auto');

    function addClickListener(currentStation, found) {
        const ituCode = $('#data-station-itu').text().trim();
        const country_name = getCountryNameByItuCode(ituCode); // Get the country name for the ITU code
        const ituCodecurrentStation = currentStation + ' ' + country_name; // Append country name to currentStation
        const searchQuery = ituCodecurrentStation + ' filetype:png OR filetype:svg Radio&tbs=sbd:1&udm=2';
        tooltipContainer.css('background-color', 'var(--color-2)').on('click', () => {
            window.open('https://www.google.com/search?q=' + searchQuery, '_blank');
        });
        logoImage.css('cursor', 'pointer'); 
        // console.log(`Logo found: ${found}`);
        if (!found && logoImage.attr('src') === emptyServerPath) {
            OnlineradioboxSearch(currentStation, ituCode);
        }
    }

let isCheckSenderSet = false; // Flag to track if setTimeout for checkSender is set

function checkSender() {
    const currentStation = $('#data-station-name').text().trim();
    const currentFrequency = $('#data-frequency').text().trim();

    //console.log(`currentStation: ${currentStation}`);
    //console.log(`currentFrequency: ${currentFrequency}`);
	console.log(`window.previousSender: ${window.previousSender}`);
	console.log(`window.previousFrequency: ${window.previousFrequency}`);	

    if (currentStation && currentFrequency !== window.previousFrequency && window.previousSender !== currentStation) {
        console.log(`loop pass end`);
        window.previousFrequency = currentFrequency;
        window.previousSender = currentStation;
        addClickListener(currentStation, found);
    } else {
        // Wenn die Bedingung nicht erfüllt ist, rufe die Funktion erneut auf
        setTimeout(checkSender, 500);
    }
}

checkSender();


}

// Function to query the country name using the ITU code
function getCountryNameByItuCode(ituCode) {
  const country = countryList.find(item => item.itu_code === ituCode.toUpperCase());
  return country ? country.country : "Country not found";
}

// Function to compare the current sender with the image titles and select the most similar image
async function compareAndSelectImage(currentStation, imgSrcElements) {
    let minDistance = Infinity;
    let selectedImgSrc = null;

    // Loop through all found image titles
    imgSrcElements.forEach(imgSrcElement => {
        // Extract the title of the image
        const title = imgSrcElement.getAttribute('title');

        // Calculate the Levenshtein distance between the current sender and the image title
        const distance = Math.abs(currentStation.toLowerCase().localeCompare(title.toLowerCase()));

        // Update the selected image URL if the distance is smaller than the current minimum distance
        if (distance < minDistance) {
            minDistance = distance;
            selectedImgSrc = imgSrcElement.getAttribute('src');
        }
    });

    // Add "https://" to the beginning if not present
    if (selectedImgSrc && !selectedImgSrc.startsWith('https://')) {
        selectedImgSrc = 'https:' + selectedImgSrc;
    }

    return selectedImgSrc;
}

// Function to fetch and process the page via the proxy
async function parsePage(url, currentStation) {
    try {
        // Fetch the HTML content of the page
        const corsAnywhereUrl = 'http://89.58.28.164:13128/';
        const response = await fetch(`${corsAnywhereUrl}${url}`);
        const html = await response.text();

        // Parse the HTML content and extract the necessary information
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        // Dynamic search for images with titles
        const imgSrcElements = doc.querySelectorAll('img[class="station__title__logo"]');

        // Compare the current sender with the image titles and select the most similar image
        const selectedImgSrc = await compareAndSelectImage(currentStation, imgSrcElements);
        
        // Further processing steps here, such as assigning the link to an image element or other actions
        console.log('The selected image source is:', selectedImgSrc);
		logoImage.attr('src', selectedImgSrc).attr('alt', 'Onlineradiobox Logo');
		logoImage.css('cursor', 'pointer'); // Mauszeiger auf Klickcursor setzen
    } catch (error) {
        // Handle errors fetching and processing the page
        console.error('Error fetching and processing the page:', error);
		logoImage.attr('src', defaultServerPath).attr('alt', 'Default Logo').off('click');
		logoImage.css('cursor', 'default'); 
    }
}

// Definition of the OnlineradioboxSearch function in a separate module
async function OnlineradioboxSearch(currentStation, ituCode) {

        // Replace spaces in currentStation with %20
        currentStation = currentStation.replace(/\s/g, '%20');
        
        // Find the selected country information based on the ITU code
        const selectedCountry = countryList.find(item => item.itu_code === ituCode);
        const selectedCountryCode = selectedCountry ? selectedCountry.country_code : null;

        // The URL of the search page
        const searchUrl = `https://onlineradiobox.com/search?c=${selectedCountryCode}&cs=${selectedCountryCode}&q=${currentStation}`;
        console.log('The Search-URL is:', searchUrl);

        // Call the function to fetch and process the search page HTML content via the proxy
        await parsePage(searchUrl, currentStation); // Pass currentStation to parsePage
    }

// The list of countries and their ITU codes
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
    { itu_code: 'G', country_code: 'uk', country: 'United Kingdom' },
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
    { itu_code: 'PRT', country_code: 'pt', country: 'Portugal' },
    { itu_code: 'QAT', country_code: 'qa', country: 'Qatar' },
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
    { itu_code: 'SWZ', country_code: 'ch', country: 'Switzerland' },
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
];
