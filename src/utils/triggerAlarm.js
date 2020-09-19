const _ = require('lodash');
const { getIsoDate } = require('./date');
const { getAlarmMessage } = require('../lib/api');
const state = require('../state');
const setAlarmInEmitter = require('./setAlarmInEmitter');

module.exports = async (alarm) => {
  const date = getIsoDate();
  if (alarm.rang.includes(date)) return null;
  console.log('RING RING RING');
  // try {
  //   const { alarmMessage, removeAlarm, alarmId } = await getAlarmMessage(alarm._id);
  //   console.log('success!');

  //   if (removeAlarm) {
  //     const alarmsClone = _.cloneDeep(state.alarms);
  //     const filteredAlarmsClone = alarmsClone.filter(a => a._id !== alarmId);
  //     state.alarms = filteredAlarmsClone;
  //     eventEmitter.clear();
  //     filteredAlarmsClone.forEach(a => setAlarmInEmitter(a));
  //   }

  // } catch(e) {
  //   console.log('triggerAlarm error', e)
  // }
  return true;
};
