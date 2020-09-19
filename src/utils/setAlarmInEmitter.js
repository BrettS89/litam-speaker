// const eventEmitter = require('../EventEmitter');

module.exports = (alarm, ee) => {
  const a = {
    ...alarm,
    rang: [],
  };
  ee.on(a.time, a);
};
