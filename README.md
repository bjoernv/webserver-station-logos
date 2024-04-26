# Station Logo Plugin for [FM-DX-Webserver](https://github.com/NoobishSVK/fm-dx-webserver)

Compatible from version 1.2.0

![Screenshot3](https://github.com/Highpoint2000/webserver-station-logos/assets/168109804/c66bab09-045e-47d3-a719-9e269bb48a4a)

### Installation Notes:

1. [Download](https://github.com/Highpoint2000/webserver-station-logos/releases) the last repository as a zip
2. unpack it into the plugin folder of the web server
3. activate it in the settings

If you are still using an older version of the [FM-DX-Webserver](https://github.com/NoobishSVK/fm-dx-webserver), add the following line at the end of the /web/index.ejs: <script src="https://tef.noobish.eu/logos/scripts/js/updateStationLogo.js"></script>

The correct station logo should then be loaded during RDS recognition, provided a specific logo has already been created on our [server](https://tef.noobish.eu/logos/). 

### Add missing logos:

Please search for the missing logo on the Internet using Google - for example: https://www.google.com/search?q=park+fm+png+pl You can often find the correct files in PNG or SVG format with a transparent background. These fit very well into the look of the web server. For the PNG format, the smallest version is often sufficient, as we currently process a maximum of 140 pixels width and 60 pixels height. If you are creating logos for different countries, please put them in separate folders that you are welcome to use with the ITU names. Then simply send me the files or a download link via [email](mailto:highpoint2000@googlemail.com). I will upload them to our [server](https://tef.noobish.eu/logos/) as soon as possible.
