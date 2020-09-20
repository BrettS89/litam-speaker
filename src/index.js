const fs = require('fs');
const express = require('express');
const io = require('socket.io-client')
const api = require('./lib/api');
const keys = require('./config');
const app = express();
require('./Timer');
const setAlarmInEmitter = require('./utils/setAlarmInEmitter');
const state = require('./state');
const eventEmitter = require('./EventEmitter');
const handlers = require('./handlers');

const socket = io(keys.SOCKET_URI, {
  query: {
    givenId: fs.readFileSync(__dirname + '/../id.txt', { encoding: 'utf-8' }),
  },
  transports: ['websocket']
});

socket.on('ALARM_ADDED', (data) => {
  handlers.addAlarm(data.alarm);
});

socket.on('ALARM_DELETED', data => {
  handlers.deleteAlarm(data._id);
});

socket.on('ALARM_TOGGLED', data => {
  handlers.toggleAlarm(data.alarm);
});

(async () => {
  const myAlarms = await api.getMyAlarms();
  state.alarms = myAlarms;
  state.alarms.forEach(a => setAlarmInEmitter(a, eventEmitter));
})();

module.exports = app;
