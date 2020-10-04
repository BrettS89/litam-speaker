const fs = require('fs');
const express = require('express');
const io = require('socket.io-client')
const keys = require('./config');
const handlers = require('./handlers');
require('./Timer');
require('./utils/bluetooth');

const app = express();

const socket = io(keys.SOCKET_URI, {
  query: {
    givenId: fs.readFileSync(__dirname + '/../id.txt', { encoding: 'utf-8' }),
    userId: fs.readFileSync(__dirname + '/../userId.txt', { encoding: 'utf-8' }),
  },
  transports: ['websocket']
});

socket.on('SET_ALARMS', data => {
  try {
    handlers.setAlarms(data.myAlarms);
  } catch(e) {
    console.log('setAlarmsHandler error', e);
  }
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

module.exports = app;
