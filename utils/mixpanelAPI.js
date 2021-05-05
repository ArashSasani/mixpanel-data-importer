const Mixpanel = require("mixpanel");
const { sleep, logInfo, getUNIXTimestamp } = require("./helpers");

const token = "YOUR PROJECT TOKEN";
const apiKey = "YOUR PROJECT API KEY";
//sleep time between sending each event
const sleepTime = 3000; //0;

const mixpanel_importer = Mixpanel.init(token, {
  key: apiKey,
});

const sendEvent = (eventName, item) => {
  const userId = item.userId;
  const date = item.createdAt;
  const time = item.time;

  let data = {
    distinct_id: userId,
    user_id: userId,
    date: date,
    time: time,
    //...rest of the data you want to pass to Mixpanel as props of the event go here
    device_type: item.deviceType,
    utm_source: item.utmSource,
    utm_campaign: item.utmCampaign,
  };
  //import the event to mixpanel
  mixpanel_importer.import(eventName, time, data);

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

const batchSend = async (data, eventName, isEventNew) => {
  const numberOfRecords = data.length;
  logInfo("total number of records: " + numberOfRecords);

  logInfo(`"${eventName}" ${isEventNew ? "is new" : "is not new"} to Mixpanel`);
  //to show the event on insights tab of Mixpanel, you need to first send a dummy data for the event
  //or you can skip this part
  if (isEventNew) {
    mixpanel_importer.track(eventName, {
      user_id: 0,
      description: "just to show up the event on insights",
      include: false, //by this prop you can filter your data in Mixpanel
    });
  }
  //sending the events
  let counter = 0;
  data.forEach((item, index) => {
    //you can pause after the app sends each event
    //in case, you have any restrictions for your Mixpanel account
    sleep(() => {
      item.time = getUNIXTimestamp(item.createdAt);
      sendEvent(eventName, item);
      counter++;
      logInfo("counter: " + counter);

      if (index == numberOfRecords - 1) {
        logInfo(
          `done, all data for the event: '${eventName}', have been sent!`
        );
      }
    }, index * sleepTime);
  });
};

module.exports = {
  batchSend,
};
