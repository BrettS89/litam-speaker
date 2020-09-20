const { exec } = require('child_process')
const fs = require('fs');
const https = require('https');
/* must $sudo apt-get install mpg123 */

const downloadAndPlay = (uri) => {
  const file = fs.createWriteStream('./audio.mp3');
  https.get(uri, res => {
    res.pipe(file);
    file.on('finish', () => play('./audio.mp3'));
  });
};

const play = path => exec(`mpg123 --loop 3 ${path}`);

const stop = () => exec('pkill mpg123');

module.exports = {
  downloadAndPlay,
  play,
  stop,
};