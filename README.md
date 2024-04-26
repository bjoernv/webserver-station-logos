### Station Logo Plugin for [FM-DX-Webserver](https://github.com/NoobishSVK/fm-dx-webserver)

Compatible from version 1.2.0

Installation Notes:

1. Download the repository as a zip
2. unpack it into the plugin folder of the web server
3. activate it in the settings

The correct station logo should then be loaded during RDS recognition, provided a specific logo has already been created on our [server](https://tef.noobish.eu/logos/). 

If you are still using an older version of the [FM-DX-Webserver](https://github.com/NoobishSVK/fm-dx-webserver), add the following line at the end of the /web/index.ejs:
<script src="https://tef.noobish.eu/logos/scripts/js/updateStationLogo.js"> </script>
