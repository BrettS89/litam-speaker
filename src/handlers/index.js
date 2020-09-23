const _ = require('lodash');
const state = require('../state');
const eventEmitter = require('../EventEmitter');
const setAlarmInEmitter = require('../utils/setAlarmInEmitter');
const audio = require('../utils/audio');

exports.setAlarms = alarms => {
  state.alarms = alarms;
  eventEmitter.clear();
  state.alarms.forEach(a => setAlarmInEmitter(a, eventEmitter));
};

exports.addAlarm = alarm => {
  const alarms = [alarm, ...state.alarms];
  state.alarms = alarms;
  eventEmitter.clear();
  state.alarms.forEach(a => setAlarmInEmitter(a, eventEmitter));
};

exports.deleteAlarm = _id => {
  const alarmsClone = _.cloneDeep(state.alarms);
  const alarms = alarmsClone.filter(a => a._id !== _id);
  state.alarms = alarms;
  eventEmitter.clear();
  state.alarms.forEach(a => setAlarmInEmitter(a, eventEmitter));
};

exports.toggleAlarm = alarm => {
  const alarmsClone = _.cloneDeep(state.alarms);
  const updatedAlarmsClone = alarmsClone.map(a => {
    if (a._id === alarm._id) return alarm;
    return a;
  });
  state.alarms = updatedAlarmsClone;
  eventEmitter.clear();
  state.alarms.forEach(a => setAlarmInEmitter(a, eventEmitter));
};

exports.stopAlarm = () => audio.stop();
