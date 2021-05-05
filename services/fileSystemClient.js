const fs = require("fs");
const mixpanelAPI = require("../utils/mixpanelAPI");
const { logError } = require("../utils/helpers");

//exports the json file, then
//sends items in the extracted json file to Mixpanel like events

const action = async (eventName, isEventNew, filename) => {
  let result = [];
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      logError(`Error reading file from disk: ${err}`);
      return;
    }
    const items = JSON.parse(data);

    items.forEach((item) => {
      result.push(item);
    });
    mixpanelAPI.batchSend(result, eventName, isEventNew);
  });
};

module.exports = { action };
