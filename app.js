const fsClient = require("./services/fileSystemClient");
const apiClient = require("./services/apiClient");

const EVENT_NAME = "EVENT NAME";
//is this the first time you are sending this event to Mixpanel?
const IS_EVENT_NEW = true;

const useFsClient = async (filename) => {
  await fsClient.action(EVENT_NAME, IS_EVENT_NEW, filename);
};
const useApiClient = async (endpointUrl) => {
  await apiClient.action(EVENT_NAME, IS_EVENT_NEW, endpointUrl);
};

//if you are getting your data from filesystem or json file generated from the database, use this:
//useFsClient("data.json");

//otherwise, if you are getting your data from any API endpoint, use this:
useApiClient("http://localhost:7000");
