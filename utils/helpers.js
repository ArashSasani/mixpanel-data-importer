const sleep = (callback, milliseconds) => {
  return setTimeout(callback, milliseconds);
};

const getUNIXTimestamp = (time) => {
  return new Date(time).getTime();
};

const logInfo = (msg) => {
  console.log(msg);
};
const logError = (err) => {
  console.error(err);
};

module.exports = {
  sleep,
  getUNIXTimestamp,
  logInfo,
  logError,
};
