const express = require('express');
const api = require('./lib/api');
const app = express();
const timer = require('./Timer');
const setAlarmInEmitter = require('./utils/setAlarmInEmitter');
const state = require('./state');
const eventEmitter = require('./EventEmitter');

(async () => {
  const myAlarms = await api.getMyAlarms();
  state.alarms = myAlarms;
  state.alarms.forEach(a => setAlarmInEmitter(a, eventEmitter));
})();

module.exports = app;
