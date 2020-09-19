const app = require('./src');
const keys = require('./src/config');

app.listen(keys.port, () => {
  console.log('Server listening on port', keys.port);
});
