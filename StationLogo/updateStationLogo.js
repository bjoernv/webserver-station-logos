//////////////////////////////////////////////////////////////////////////////////////
///                                                                                ///
///  STATION LOGO INSERT SCRIPT FOR FM-DX-WEBSERVER (V2.1)			   ///
///                                                                                /// 
///  Thanks to Ivan_FL, Adam W, mc_popa & noobish for the ideas, code and design!  ///
///                                                                                ///
///  New Logo Files (png/svg) and Feedback are welcome!                            ///
///  73! Highpoint                                                                 ///
///                                                          last update: 25.04.24 ///
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

var serverpath = 'https://tef.noobish.eu/logos/'; // Server Path for Logo Collection
var defaultImagePath = serverpath + 'default-logo.png'; // Display Standard Logo
// var defaultImagePath = serverpath + 'empty-logo.png'; // No Display

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
        // Führe die Funktion DefaultLogo aus, wenn piCode leer ist
        logoImage.attr('src', defaultImagePath);
        logoImage.attr('alt', 'Default Logo');
        window.piCode = piCode;
    } else {
        updateStationLogo(piCode, logoImage);
    }
}

function updateStationLogo(piCode, logoImage) {

    var piCodeContainer = $('#data-pi');
    var piCode = piCodeContainer.text().trim().replace('?', '').replace('??', '');
    var piCode = piCode.toUpperCase();

    var ituCodeContainer = $('#data-station-itu');
    var ituCode = ituCodeContainer.text().trim();

    if (piCode != window.piCode || ituCode != window.ituCode) {
        window.piCode = piCode;
        window.ituCode = ituCode;

        var imagePathGIF = serverpath + ituCode + '/' + piCode + '.gif';
        var imagePathPNG = serverpath + ituCode + '/' + piCode + '.png';
        var imagePathSVG = serverpath + ituCode + '/' + piCode + '.svg';

        // Exception rules for private stations
        // if (piCode == 'C0DE' || piCode == 'ABCD' || piCode == 'CAFE') {
        //    imagePathGIF = '/logos/' + piCode + '.gif';
        //    imagePathPNG = '/logos/' + piCode + '.png';
        //    imagePathSVG = '/logos/' + piCode + '.svg';
        // }

        // Check if the specific PI code image exists
        $.ajax({
            url: imagePathGIF,
            type: 'HEAD',
            success: function() {
                logoImage.attr('src', imagePathGIF);
                logoImage.attr('alt', 'Logo for station ' + piCode);
            },
            error: function() {
                $.ajax({
                    url: imagePathPNG,
                    type: 'HEAD',
                    success: function() {
                        logoImage.attr('src', imagePathPNG);
                        logoImage.attr('alt', 'Logo for station ' + piCode);
                    },
                    error: function() {
                        $.ajax({
                            url: imagePathSVG,
                            type: 'HEAD',
                            success: function() {
                                logoImage.attr('src', imagePathSVG);
                                logoImage.attr('alt', 'Logo for station ' + piCode);
                            },
                            error: function() {
                                logoImage.attr('src', defaultImagePath);
                                logoImage.attr('alt', 'Default Logo');
                            }
                        });
                    }
                });
            }
        });

        logoImage.css('display', 'block');
    }
}



