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
  try {
    handlers.addAlarm(data.alarm);
  } catch(e) {
    console.log('alarmAddedHandler error', e);
  }
});

socket.on('ALARM_DELETED', data => {
  try {
    handlers.deleteAlarm(data._id);
  } catch(e) {
    console.log('alarmDeletedHandler error', e);
  } 
});

socket.on('ALARM_TOGGLED', data => {
  try {
    handlers.toggleAlarm(data.alarm);
  } catch(e) {
    console.log('alarmToggledHandler error', e);
  }
});

socket.on('STOP_ALARM', data => {
  try {
    handlers.stopAlarm();
  } catch(e) {
    console.log('stopAlarmHandler errir', e);
  }
});

// (async () => {
//   const myAlarms = await api.getMyAlarms();
//   state.alarms = myAlarms;
//   state.alarms.forEach(a => setAlarmInEmitter(a, eventEmitter));
// })();

module.exports = app;
