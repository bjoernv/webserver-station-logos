# Station Logo Plugin for [FM-DX-Webserver](https://github.com/NoobishSVK/fm-dx-webserver)
![Screenshot3](https://github.com/Highpoint2000/webserver-station-logos/assets/168109804/c66bab09-045e-47d3-a719-9e269bb48a4a)

Compatible from version 1.2.0

(if you are still using an older version of the [FM-DX-Webserver](https://github.com/NoobishSVK/fm-dx-webserver), add the following line at the end of the /web/index.ejs: <script src="https://tef.noobish.eu/logos/scripts/js/updateStationLogo.js"></script>)



### Installation notes:

1. [Download](https://github.com/Highpoint2000/webserver-station-logos/releases) the last repository as a zip
2. Unpack it into the plugin folder of the web server
3. Restart the server
4. Activate it in the settings

Important notes: 
In order for logos to be displayed, your own location in the web server must also be correctly entered and activated! Otherwise, the system cannot receive an ITU code of the sender location to display the logo. 

The correct station logo should then be loaded during RDS recognition, provided a specific logo has already been created on our [server](https://tef.noobish.eu/logos/). 

### version v2.25a:
- optimized Google Search Function (ITU code added)

### Add missing logos:

Please use the integrated Google search function in V2.2 or V2.2a. In most cases you can find the right logo this way. Many Logos are in PNG or SVG format with a transparent background. These fit very well into the look of the web server. For the PNG format a small variant is often sufficient, as we currently process a maximum of 140 pixels width and 60 pixels height. Basically the script fits the logos into the existing window. If you are creating logos for different countries, please put them in separate folders that you are welcome to use with the ITU names. Then simply send me the files or a download link via [email](mailto:highpoint2000@googlemail.com). I will upload them to our [server](https://tef.noobish.eu/logos/) as soon as possible.
