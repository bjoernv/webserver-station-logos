//////////////////////////////////////////////////////////////////////////////////////
///                                                                                ///
///  STATION LOGO INSERT SCRIPT FOR FM-DX-WEBSERVER (V2.25a)			   ///
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
        tooltipContainer.css('background-color', 'var(--color-2)').on('click', () => {
            const ituCode = $('#data-station-itu').text().trim();
            const searchQuery = currentSender + ' ' + ituCode + ' SVG PNG Radio&tbs=sbd:1&udm=2';
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
