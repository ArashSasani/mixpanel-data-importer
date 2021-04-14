const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const logInfo = (msg) => {
  console.log(msg);
};
const logError = (err) => {
  console.error(err);
};

module.exports = {
  sleep,
  logInfo,
  logError,
};
