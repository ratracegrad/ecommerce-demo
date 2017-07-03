'use strict';

/* require modules */
const app = require('./server/app');
const http = require('http');
const port = process.env.PORT || 3000;

/* start server and set event listening function */
const server = http.createServer(app);
server.listen(port);

server.on('listening', onListening);
server.on('error', onError);

/* server event methods below */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }

}

function onListening() {
  console.log(`Server listening on port ${port}`);
}