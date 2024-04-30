//////////////////////////////////////////////////////////////////////////////////////
///                                                                                ///
///  STATION LOGO INSERT SCRIPT FOR FM-DX-WEBSERVER (V2.25c)			   ///
///                                                                                /// 
///  Thanks to Ivan_FL, Adam W, mc_popa & noobish for the ideas, code and design!  ///
///                                                                                ///
///  New Logo Files (png/svg) and Feedback are welcome!                            ///
///  73! Highpoint                                                                 ///
///                                                          last update: 30.04.24 ///
//////////////////////////////////////////////////////////////////////////////////////


// Inject Logo Code for Desktop Devices //

// Select the parent <div> element
var parentDiv = document.querySelector('.panel-75.flex-container.no-bg');

// Create the new HTML code

const DesktopHTML = `
    <div class="panel-10 no-bg h-50 m-0 m-right-20 hide-phone" style="width: 100px;height: 100%;margin-right: 20px !important;">
        <button class="playbutton" aria-label="Play / Stop Button"><i class="fa-solid fa-play fa-lg"></i></button>
    </div>
    <div class="panel-75 m-0 m-right-20 hover-brighten flex-center tooltip" id="ps-container" style="height: 90px;margin-right: 20px!important" data-tooltip="Clicking on the RDS PS will copy the RDS info into the clipboard.">
        <span class="text-big" id="data-ps"></span>
    </div>
    <div class="panel-30 m-0 hide-phone tooltip" style="width: 35%" data-tooltip="">
        <div id="logo-container-desktop" style="width: auto; height: 60px; display: flex; justify-content: center; align-items: center; margin: auto;">                 
            <img id="station-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC" alt="station-logo-desktop" style="max-width: 140px; padding: 1px 2px; max-height: 100%; margin-top: 30px; display: block; cursor: pointer;">	
        </div>
    </div>
`;

parentDiv.innerHTML = DesktopHTML;

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
    </div>
`;

// Replace the HTML content of the <div> element with the new HTML code
flagsContainerPhone.innerHTML = MobileHTML;

// Display the Logo //

const serverpath = 'https://tef.noobish.eu/logos/';
const localpath = '/logos/';
const defaultServerPath = serverpath + 'default-logo.png';

if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    var logoImage = $('#station-logo-phone');
} else {
    var logoImage = $('#station-logo');
}

setInterval(CheckPI, 1000);

function CheckPI() {
    const piCodeContainer = $('#data-pi');
    const piCode = piCodeContainer.text().trim().replace(/[?]{1,2}/g, '').toUpperCase();
    const sender = $('#data-station-name').text().trim();
    const tooltipContainer = $('.panel-30');

    tooltipContainer.attr('data-tooltip', `Google Search the right or missing Logo, save as *PI-Code*.svg or *PI-Code*.png and send this with country info to highpoint2000@googlemail.com`);

    if (piCode === '' || piCode.includes('?')) {
        tooltipContainer.trigger('mouseleave').css('background-color', '');
        updateStationLogo(defaultServerPath, piCode, sender);
    } else {
        updateStationLogo(logoImage.attr('src'), piCode, sender);
    }
}

function updateStationLogo(currentImagePath, piCode, sender) {
    const ituCode = $('#data-station-itu').text().trim();
    const tooltipContainer = $('.panel-30');

    if (piCode !== window.piCode || ituCode !== window.ituCode) {
        window.piCode = piCode;
        window.ituCode = ituCode;

        const paths = [
            `${serverpath}${ituCode}/${piCode}.gif`,
            `${serverpath}${ituCode}/${piCode}.svg`,
            `${serverpath}${ituCode}/${piCode}.png`,
            `${localpath}${piCode}.gif`,
            `${localpath}${piCode}.svg`,
            `${localpath}${piCode}.png`
        ];

        let found = false;
        let i = 0;

        function checkNext() {
            if (found || i >= paths.length) {
                if (!found) {
                    logoImage.attr('src', defaultServerPath).attr('alt', 'Default Logo');
                    LogoSearch(piCode, sender); // Call LogoSearch() if no logo is found
                }
                return;
            }
            const xhr = new XMLHttpRequest();
            xhr.open('HEAD', paths[i], true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    logoImage.attr('src', paths[i]).attr('alt', `Logo for station ${piCode}`).css('display', 'block');
                    found = true;
                    LogoSearch(piCode, sender); // Call LogoSearch() if a logo is found
                } else {
                    i++;
                    checkNext();
                }
            };
            xhr.onerror = function () { // Handling error cases
                i++;
                checkNext();
            };
            xhr.send();
        }

        checkNext();
    }
}

var previousSender = ''; // Global variable to store the previous sender

function LogoSearch(piCode) {
    const tooltipContainer = $('.panel-30');
    tooltipContainer.css('background-color', '').off('click').css('cursor', 'auto');

    function addClickListener(currentSender) {
		const ituCode = $('#data-station-itu').text().trim();
		const country_name = getCountryNameByItuCode(ituCode); // Get the country name for the ITU code
		//console.log(`Country for ITU Code ${ituCode}: ${country_name}`);
		const ituCodeCurrentSender = currentSender + ' ' + country_name; // currentSender um den Ländernamen erweitern
		const searchQuery = ituCodeCurrentSender + ' filetype:png OR filetype:svg Radio&tbs=sbd:1&udm=2';
		tooltipContainer.css('background-color', 'var(--color-2)').on('click', () => {
			window.open('https://www.google.com/search?q=' + searchQuery, '_blank');
        });
    }

    function checkSender() {
        const currentSender = $('#data-station-name').text().trim();
        if (currentSender && currentSender !== previousSender) {
            addClickListener(currentSender);
            previousSender = currentSender;
        } else {
            setTimeout(checkSender, 1000);
        }
    }

    checkSender();
}

// The list of countries and their ITU codes
const countryList = [
  { itu_code: "AFG", country: "Afghanistan" },
  { itu_code: "AFS", country: "South Africa" },
  { itu_code: "AGL", country: "Angola" },
  { itu_code: "ALB", country: "Albania" },
  { itu_code: "ALG", country: "Algeria" },
  { itu_code: "AND", country: "Andorra" },
  { itu_code: "ARG", country: "Argentina" },
  { itu_code: "ARM", country: "Armenia" },
  { itu_code: "ARS", country: "Saudi Arabia" },
  { itu_code: "ATG", country: "Antigua and Barbuda" },
  { itu_code: "AUS", country: "Australia" },
  { itu_code: "AUT", country: "Austria" },
  { itu_code: "AZE", country: "Azerbaijan" },
  { itu_code: "BAH", country: "Bahamas" },
  { itu_code: "BDI", country: "Burundi" },
  { itu_code: "BEL", country: "Belgium" },
  { itu_code: "BEN", country: "Benin" },
  { itu_code: "BFA", country: "Burkina Faso" },
  { itu_code: "BGD", country: "Bangladesh" },
  { itu_code: "BHR", country: "Bahrain" },
  { itu_code: "BIH", country: "Bosnia and Herzegovina" },
  { itu_code: "BLR", country: "Belarus" },
  { itu_code: "BLZ", country: "Belize" },
  { itu_code: "BOL", country: "Bolivia" },
  { itu_code: "BOT", country: "Botswana" },
  { itu_code: "BRB", country: "Barbados" },
  { itu_code: "BRM", country: "Myanmar" },
  { itu_code: "BRU", country: "Brunei Darussalam" },
  { itu_code: "BTN", country: "Bhutan" },
  { itu_code: "BUL", country: "Bulgaria" },
  { itu_code: "CAF", country: "Central African Republic" },
  { itu_code: "CAN", country: "Canada" },
  { itu_code: "CBG", country: "Cambodia" },
  { itu_code: "CHL", country: "Chile" },
  { itu_code: "CHN", country: "China" },
  { itu_code: "CLM", country: "Colombia" },
  { itu_code: "CLN", country: "Sri Lanka" },
  { itu_code: "CME", country: "Cameroon" },
  { itu_code: "COD", country: "Democratic Republic of the Congo" },
  { itu_code: "COG", country: "Congo" },
  { itu_code: "COM", country: "Comoros" },
  { itu_code: "CPV", country: "Cape Verde" },
  { itu_code: "CTI", country: "Ivory Coast" },
  { itu_code: "CTR", country: "Costa Rica" },
  { itu_code: "CUB", country: "Cuba" },
  { itu_code: "CVA", country: "Vatican City" },
  { itu_code: "CYP", country: "Cyprus" },
  { itu_code: "CZE", country: "Czech Republic" },
  { itu_code: "D", country: "Germany" },
  { itu_code: "DJI", country: "Djibouti" },
  { itu_code: "DMA", country: "Dominica" },
  { itu_code: "DNK", country: "Denmark" },
  { itu_code: "DOM", country: "Dominican Republic" },
  { itu_code: "E", country: "Spain" },
  { itu_code: "EGY", country: "Egypt" },
  { itu_code: "EQA", country: "Ecuador" },
  { itu_code: "ERI", country: "Eritrea" },
  { itu_code: "EST", country: "Estonia" },
  { itu_code: "ETH", country: "Ethiopia" },
  { itu_code: "F", country: "France" },
  { itu_code: "FIN", country: "Finland" },
  { itu_code: "FJI", country: "Fiji" },
  { itu_code: "FSM", country: "Micronesia" },
  { itu_code: "G", country: "United Kingdom" },
  { itu_code: "GAB", country: "Gabon" },
  { itu_code: "GEO", country: "Georgia" },
  { itu_code: "GHA", country: "Ghana" },
  { itu_code: "GMB", country: "Gambia" },
  { itu_code: "GNB", country: "Guinea-Bissau" },
  { itu_code: "GNE", country: "Equatorial Guinea" },
  { itu_code: "GRC", country: "Greece" },
  { itu_code: "GRD", country: "Grenada" },
  { itu_code: "GTM", country: "Guatemala" },
  { itu_code: "GUI", country: "Guinea" },
  { itu_code: "GUY", country: "Guyana" },
  { itu_code: "H", country: "Honduras" },
  { itu_code: "HNG", country: "Hungary" },
  { itu_code: "HOL", country: "Netherlands" },
  { itu_code: "HRV", country: "Croatia" },
  { itu_code: "HTI", country: "Haiti" },
  { itu_code: "I", country: "Italy" },
  { itu_code: "IND", country: "India" },
  { itu_code: "INS", country: "Indonesia" },
  { itu_code: "IRL", country: "Ireland" },
  { itu_code: "IRN", country: "Iran" },
  { itu_code: "IRQ", country: "Iraq" },
  { itu_code: "ISL", country: "Iceland" },
  { itu_code: "ISR", country: "Israel" },
  { itu_code: "J", country: "Japan" },
  { itu_code: "JMC", country: "Jamaica" },
  { itu_code: "JOR", country: "Jordan" },
  { itu_code: "KAZ", country: "Kazakhstan" },
  { itu_code: "KEN", country: "Kenya" },
  { itu_code: "KGZ", country: "Kyrgyzstan" },
  { itu_code: "KIR", country: "Kiribati" },
  { itu_code: "KNA", country: "Saint Kitts and Nevis" },
  { itu_code: "KOR", country: "Korea" },
  { itu_code: "KRE", country: "North Korea" },
  { itu_code: "KWT", country: "Kuwait" },
  { itu_code: "L", country: "Laos" },
  { itu_code: "LBN", country: "Lebanon" },
  { itu_code: "LBR", country: "Liberia" },
  { itu_code: "LBY", country: "Libya" },
  { itu_code: "LCA", country: "Saint Lucia" },
  { itu_code: "LIE", country: "Liechtenstein" },
  { itu_code: "LSO", country: "Lesotho" },
  { itu_code: "LTU", country: "Lithuania" },
  { itu_code: "LUX", country: "Luxembourg" },
  { itu_code: "LVA", country: "Latvia" },
  { itu_code: "MAU", country: "Mauritius" },
  { itu_code: "MCO", country: "Monaco" },
  { itu_code: "MDA", country: "Moldova" },
  { itu_code: "MDG", country: "Madagascar" },
  { itu_code: "MEX", country: "Mexico" },
  { itu_code: "MHL", country: "Marshall Islands" },
  { itu_code: "MKD", country: "Macedonia" },
  { itu_code: "MLA", country: "Malaysia" },
  { itu_code: "MLD", country: "Maldives" },
  { itu_code: "MLI", country: "Mali" },
  { itu_code: "MLT", country: "Malta" },
  { itu_code: "MNE", country: "Montenegro" },
  { itu_code: "MNG", country: "Mongolia" },
  { itu_code: "MOZ", country: "Mozambique" },
  { itu_code: "MRC", country: "Morocco" },
  { itu_code: "MTN", country: "Mauritania" },
  { itu_code: "MWI", country: "Malawi" },
  { itu_code: "NCG", country: "Nicaragua" },
  { itu_code: "NGR", country: "Niger" },
  { itu_code: "NIG", country: "Nigeria" },
  { itu_code: "NMB", country: "Namibia" },
  { itu_code: "NOR", country: "Norway" },
  { itu_code: "NPL", country: "Nepal" },
  { itu_code: "NRU", country: "Nauru" },
  { itu_code: "NZL", country: "New Zealand" },
  { itu_code: "OMA", country: "Oman" },
  { itu_code: "PAK", country: "Pakistan" },
  { itu_code: "PHL", country: "Philippines" },
  { itu_code: "PNG", country: "Papua New Guinea" },
  { itu_code: "PNR", country: "Panama" },
  { itu_code: "POL", country: "Poland" },
  { itu_code: "POR", country: "Portugal" },
  { itu_code: "PRG", country: "Paraguay" },
  { itu_code: "PRU", country: "Peru" },
  { itu_code: "QAT", country: "Qatar" },
  { itu_code: "ROU", country: "Romania" },
  { itu_code: "RRW", country: "Rwanda" },
  { itu_code: "RUS", country: "Russia" },
  { itu_code: "S", country: "Sweden" },
  { itu_code: "SDN", country: "Sudan" },
  { itu_code: "SEN", country: "Senegal" },
  { itu_code: "SEY", country: "Seychelles" },
  { itu_code: "SLM", country: "Solomon Islands" },
  { itu_code: "SLV", country: "El Salvador" },
  { itu_code: "SMO", country: "Samoa" },
  { itu_code: "SMR", country: "San Marino" },
  { itu_code: "SNG", country: "Singapore" },
  { itu_code: "SOM", country: "Somalia" },
  { itu_code: "SRB", country: "Serbia" },
  { itu_code: "SRL", country: "Sierra Leone" },
  { itu_code: "SSD", country: "South Sudan" },
  { itu_code: "STP", country: "São Tomé and Príncipe" },
  { itu_code: "SUI", country: "Switzerland" },
  { itu_code: "SUR", country: "Suriname" },
  { itu_code: "SVK", country: "Slovakia" },
  { itu_code: "SVN", country: "Slovenia" },
  { itu_code: "SWZ", country: "Swaziland" },
  { itu_code: "SYR", country: "Syria" },
  { itu_code: "TCD", country: "Chad" },
  { itu_code: "TGO", country: "Togo" },
  { itu_code: "THA", country: "Thailand" },
  { itu_code: "TJK", country: "Tajikistan" },
  { itu_code: "TKM", country: "Turkmenistan" },
  { itu_code: "TLS", country: "Timor-Leste" },
  { itu_code: "TON", country: "Tonga" },
  { itu_code: "TRD", country: "Trinidad and Tobago" },
  { itu_code: "TUN", country: "Tunisia" },
  { itu_code: "TUR", country: "Turkey" },
  { itu_code: "TUV", country: "Tuvalu" },
  { itu_code: "TZA", country: "Tanzania" },
  { itu_code: "UAE", country: "United Arab Emirates" },
  { itu_code: "UGA", country: "Uganda" },
  { itu_code: "UKR", country: "Ukraine" },
  { itu_code: "URG", country: "Uruguay" },
  { itu_code: "USA", country: "United States of America" },
  { itu_code: "UZB", country: "Uzbekistan" },
  { itu_code: "VCT", country: "Saint Vincent and the Grenadines" },
  { itu_code: "VEN", country: "Venezuela" },
  { itu_code: "VTN", country: "Vietnam" },
  { itu_code: "VUT", country: "Vanuatu" },
  { itu_code: "YEM", country: "Yemen" },
  { itu_code: "ZMB", country: "Zambia" },
  { itu_code: "ZWE", country: "Zimbabwe" }
];

// Function to query the country name using the ITU code
function getCountryNameByItuCode(ituCode) {
  const country = countryList.find(item => item.itu_code === ituCode.toUpperCase());
  return country ? country.country : "Country not found";
}
