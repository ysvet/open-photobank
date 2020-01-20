*************************************
A gallery built with React, Node.js, Express and MongoDB.<br />
View high-res images with OpenSeaDragon.<br />
Download images.<br />
Organize images with custom categories, time periods, locations, albums, contributors.<br />
Upload, add/edit image info in Dashboard.
*************************************

Run npm install in root and api folders.<br />
Run with 'npm run dev'.<br />
Attention for Windows users - one of the packages (sharp) won't work as expected. It will create another folder with image tiles in its subfolder while uploading an image.

***********************************
Dashboard - /adm <br />
Closing/open registration is done by removing Register route from router.js. In real case usage you will probably want co close registration after registering one or two admin users.<br />
Connection data to your db - in api/config/default.json
