const Mixpanel = require("mixpanel");
const fs = require("fs");
const { sleep, logInfo } = require("./utils");

const token = "YOUR PROJECT TOKEN";
const apiKey = "YOUR PROJECT API KEY";
//sleep time between sending each event item
const sleepTime = 3000;

const mixpanel_importer = Mixpanel.init(token, {
  key: apiKey,
});

const sendEvent = async (eventName, item) => {
  const userId = item.userId;
  const date = item.createdAt;
  const time = item.time;

  let data = {
    distinct_id: userId,
    user_id: userId,
    date: date,
    time: time,
    //...rest of the data you want to pass to Mixpanel as props of the event
    device_type: item.deviceType,
    utm_source: item.utmSource,
    utm_campaign: item.utmCampaign,
  };
  //import event to mixpanel
  mixpanel_importer.import(eventName, time, data);

  //log
  logInfo(
    "event sent @" +
      new Date() +
      ", eventName: " +
      eventName +
      ", userId: " +
      userId +
      ", date: " +
      date +
      ", time: " +
      time
  );
};

const batchSend = async (eventName, counter = 0) => {
  if (sampleData.length > counter) {
    //to show the event on insights tab of Mixpanel, you need to first send a dummy data for the event
    //or you can skip this part
    if (isEventNew) {
      mixpanel_importer.track(eventName, {
        user_id: 0,
        description: "just to show up the event on insights",
      });
      isEventNew = false;
      await sleep(sleepTime);
    }
    //sending the event
    sendEvent(eventName, sampleData[counter]);
    counter++;
    logInfo("counter: " + counter);

    //you can pause the sending process for each event item
    //in case, you have any restrictions for your Mixpanel account
    await sleep(sleepTime);

    batchSend(eventName, counter);
  } else {
    //finish
    logInfo(`done, all items for the event '${eventName}', have been sent!`);
  }
};

//export the json file from the db, then
//send items in the extracted json file to Mixpanel like events
const eventName = "EVENT NAME";
let sampleData = [];
let isEventNew = true;

fs.readFile("./data.json", "utf8", (err, data) => {
  if (err) {
    logInfo(`Error reading file from disk: ${err}`);
  } else {
    // parse JSON string to JSON object
    const items = JSON.parse(data);

    // print all databases
    items.forEach((item) => {
      item.time = new Date(item.createdAt).getTime();
      sampleData.push(item);
      //logInfo(item);
    });

    logInfo("total number of records: " + sampleData.length);
    batchSend(eventName);
  }
});
