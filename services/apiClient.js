const http = require("http");
const mixpanelAPI = require("../utils/mixpanelAPI");
const { logError } = require("../utils/helpers");

//gets the records from some API endpoint, then
//sends result items to Mixpanel like events

const action = async (eventName, isEventNew, endpointUrl) => {
  http
    .get(endpointUrl, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          let result = JSON.parse(body);
          mixpanelAPI.batchSend(result, eventName, isEventNew);
        } catch (error) {
          logError(error.message);
        }
      });
    })
    .on("error", (error) => {
      logError(error.message);
    });
};

module.exports = { action };
