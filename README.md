# data-importer
A Mixpanel data importer **Node** app for the data that you already have and you want to export to [Mixpanel](https://mixpanel.com/)
as events.

## Current acceptable inputs:
1. [option 1]data that you have in your database or filesystem which you can export as a json file.
2. [option 2]data you can retrieve from any API endpoint.

## You only need to:
1. [option 1]export your data which you want to import to Mixpanel as an event as a **json file**. Please take a look at [data.json](https://github.com/ArashSasani/data-importer/blob/master/data.json) and [this module](https://github.com/ArashSasani/data-importer/blob/master/services/fileSystemClient.js).
2. [option 2]call the API endpoint and get your event data as **json format**. please take a look at [this module](https://github.com/ArashSasani/data-importer/blob/master/services/apiClient.js).
3. You definitively want to change the input variables such as EVENT_NAME, etc on [app.js](https://github.com/ArashSasani/data-importer/blob/master/app.js). please take a look at comments.
4. Please don't forget to update the Mixpanel token and api key [here](https://github.com/ArashSasani/data-importer/blob/master/utils/mixpanelAPI.js)

*The rest is ready* :)
Just call **npm start**.

Check the [Mixpanel documenation](https://developer.mixpanel.com/docs/javascript) if you want to understand the code better.

## What's next?
Implementing a GUI probably by using Electron and add more features.
Any one interested in building this with me, please feel free to join :)
