# Station Logo Plugin for [FM-DX-Webserver](https://github.com/NoobishSVK/fm-dx-webserver) 
# --- Always on Update Version ---
  
![Screenshot3](https://github.com/Highpoint2000/webserver-station-logos/assets/168109804/c66bab09-045e-47d3-a719-9e269bb48a4a)

Compatible from version 1.2.0

## Installation notes:

1. Unpack it into the plugins folder in the root of the web server
2. Restart the server
3. Activate it in the settings

Important notes: 

In order for logos to be displayed, your own location in the web server must also be correctly entered and activated! Otherwise, the system cannot receive an ITU code of the sender location to display the logo. The correct station logo should then be loaded during RDS recognition, provided a specific logo has already been created on our [server](https://tef.noobish.eu/logos/) or it is located in the local /web/logos folder. 

For missing or incorrect logos, please use the integrated Google search function. In most cases, you can find the right logo this way. Many logos are in PNG or SVG format with a transparent background. These fit in very well with the look of the web server. For the PNG format, a small version is often sufficient, as we currently process a maximum of 140 pixels wide and 60 pixels high. Basically, the script inserts the logos appropriately into the existing window. If you create logos for different countries, please place them in separate folders that you are welcome to use with the ITU names. Then just send me the files or a download link via [email](mailto:highpoint2000@googlemail.com) or via our [Discord Community](https://discord.gg/ZAVNdS74mC). I will upload them to our [server](https://tef.noobish.eu/logos/) as soon as possible.
