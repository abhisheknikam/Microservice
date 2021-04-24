import http from 'http';
// eslint-disable-next-line no-unused-vars
import _ from './envConfig';
import { API_PORT, APP_NAME } from './core/constants';
import app from './app';
import logger from './core/logger';

const debug = require('debug')(APP_NAME);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Get port from environment and store in Express.
 */
const port = API_PORT;
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

process.on('uncaughtException', function handlingUnhandledException(error) {
    logger.error('An error occured! Shutting Down...');
    logger.error(error.message);
    logger.error(error.stack);
    process.exit(1);
});

export default server;
