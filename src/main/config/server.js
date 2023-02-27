const http = require('http');

module.exports = app => {
  const server = http.createServer(app);
  return server
}
