const state = require('../state');
const eventEmitter = require('../EventEmitter');
const setAlarmInEmitter = require('../utils/setAlarmInEmitter');

module.exports = alarm => {
  const alarms = [alarm, ...state.alarms];
  state.alarms = alarms;
  eventEmitter.clear();
  state.alarms.forEach(a => setAlarmInEmitter(a));
};
