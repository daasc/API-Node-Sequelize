const ExpressBrute = require("express-brute");
// const MemcachedStore = require("express-brute-memcached");
let store;

store = new ExpressBrute.MemoryStore();

const failCallback = function (req, res, next, nextValidRequestDate) {
  res.status(400).send(
    "You've made too many failed attempts in a short period of time, please try again in 1hrs "
  );
};

const handleStoreError = function (error) {
  log.error(error); // log this error so we can figure out what went wrong
  // cause node to exit, hopefully restarting the process fixes the problem
  throw {
    message: error.message,
    parent: error.parent,
  };
};
const userBruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 10 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failCallback,
  handleStoreError: handleStoreError,
});

const globalBruteforce = new ExpressBrute(store, {
  freeRetries: 1000,
  attachResetToRequest: false,
  refreshTimeoutOnRequest: false,
  minWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
  maxWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
  lifetime: 24 * 60 * 60, // 1 day (seconds not milliseconds)
  failCallback: failCallback,
  handleStoreError: handleStoreError,
});

module.exports = {
  globalBruteforce,
  userBruteforce,
};
