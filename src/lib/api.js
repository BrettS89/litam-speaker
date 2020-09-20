const fs = require('fs');
const axios = require('axios');
const { URI } = require('../config');

function getId() {
  const id = fs.readFileSync(__dirname + '/../../id.txt', { encoding: 'utf-8' });
  return id;
}

function getUserId() {
  const userId = fs.readFileSync(__dirname + '/../../userId.txt', { encoding: 'utf-8' });
  return userId;
}

exports.getMyAlarms = async () => {
  try {
    const { data: { data: { myAlarms } } } = await axios.get(`${URI}/speaker/myalarms/${getUserId()}`, {
      
      headers: {
        'authorization': getId(),
      },
    });
    return myAlarms;
  } catch(e) {
    console.log('getMyAlarmsError', e);
  }
};

exports.getAlarmMessage = async alarmId => {
  try {
    const { data } = await axios.get(`${URI}/speaker/alarmmessage/${alarmId}`, {
      headers: {
        'authorization': getId(),
      },
    });

    return data;

  } catch(e) {
    console.log('getAlarmMessage error', e);
  }
}
