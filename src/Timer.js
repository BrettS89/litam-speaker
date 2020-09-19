const eventEmitter = require('./EventEmitter');
const { getCurrentTime } = require('./utils/date');

module.exports = setInterval(() => {
  let currentTime = getCurrentTime().split(':');
  currentTime.pop();
  currentTime = currentTime.join(':');
  eventEmitter.emit(currentTime);
}, 3000);
