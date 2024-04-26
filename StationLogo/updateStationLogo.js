//////////////////////////////////////////////////////////////////////////////////////
///                                                                                ///
///  STATION LOGO INSERT SCRIPT FOR FM-DX-WEBSERVER (V2.2)			   ///
///                                                                                /// 
///  Thanks to Ivan_FL, Adam W, mc_popa & noobish for the ideas, code and design!  ///
///                                                                                ///
///  New Logo Files (png/svg) and Feedback are welcome!                            ///
///  73! Highpoint                                                                 ///
///                                                          last update: 26.04.24 ///
//////////////////////////////////////////////////////////////////////////////////////


// Inject Logo Code for Desktop Devices //

// Select the parent <div> element
var parentDiv = document.querySelector('.panel-75.flex-container.no-bg');

// Create the new HTML code
var DesktopHTML = `
    <div class="panel-10 no-bg h-100 m-0 m-right-20 hide-phone" style="width: 100px;margin-right: 20px !important;">
        <button class="playbutton" aria-label="Play / Stop Button"><i class="fa-solid fa-play fa-lg"></i></button>
    </div>
    <div class="panel-75 m-0 m-right-20 hover-brighten flex-center tooltip" id="ps-container" style="height: 90px;margin-right: 20px!important" data-tooltip="Clicking on the RDS PS will copy the RDS info into the clipboard.">
        <span class="text-big" id="data-ps"></span>
    </div>					
    <div class="panel-30 m-0 hide-phone" style="width: 35%;">
        <div id="logo-container-desktop" style="width: auto; height: 60px; display: flex; justify-content: center; align-items: center; margin: auto;">                 
            <img id="station-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC" alt="station-logo-desktop" style="max-width: 140px; padding: 1px 2px; max-height: 100%; margin-top: 30px; display: block;">	
        </div>
    </div>
`;

// Set the new HTML as the content of the parent <div> element
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

//////////////// Display the Logo  ////////////////////////

var serverpath = 'https://tef.noobish.eu/logos/'; // Server Path for official Logo Collection
var localpath = '/logos/'; // Webdirectory Path for local Logo Collection
var defaultServerPath = serverpath + 'default-logo.png'; // Display Standard Logo
// var defaultServerPath = serverpath + 'empty-logo.png'; // No Display

// Refresh the page after a delay of 1 second
setInterval(CheckPI, 1000);

function CheckPI() {
    var piCodeContainer = $('#data-pi');
    var piCode = piCodeContainer.text().trim().replace('?', '').replace('??', '');
    var piCode = piCode.toUpperCase();

    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        var logoImage = $('#station-logo-phone');
    } else {
        var logoImage = $('#station-logo');
    }

    if (piCode === '') {
        logoImage.attr('src', defaultServerPath);
        logoImage.attr('alt', 'Default Logo');
        window.piCode = piCode;
    } else {
        updateStationLogo(piCode, logoImage);
    }
}

function updateStationLogo(piCode, logoImage) {
    var ituCode = $('#data-station-itu').text().trim();
    if (piCode !== window.piCode || ituCode !== window.ituCode) {
        window.piCode = piCode;
        window.ituCode = ituCode;

        var paths = [
            serverpath + ituCode + '/' + piCode + '.gif',
            serverpath + ituCode + '/' + piCode + '.svg',
            serverpath + ituCode + '/' + piCode + '.png',
            localpath + piCode + '.gif',
            localpath + piCode + '.svg',
            localpath + piCode + '.png'
        ];

        // Function to set logo and alt
        function setLogo(src, alt) {
            logoImage.attr('src', src);
            logoImage.attr('alt', alt);
            logoImage.css('display', 'block');
        }

        // Check if the specific PI code image exists
        var found = false;
        var i = 0;

        function checkNext() {
            if (found || i >= paths.length) {
                if (!found) {
                    setLogo(defaultServerPath, 'Default Logo');
                }
                return;
            }
            $.ajax({
                url: paths[i],
                type: 'HEAD',
                success: function() {
                    setLogo(paths[i], 'Logo for station ' + piCode);
                    found = true;
                },
                error: function() {
                    i++;
                    checkNext();
                }
            });
        }

        checkNext();
    }
}



