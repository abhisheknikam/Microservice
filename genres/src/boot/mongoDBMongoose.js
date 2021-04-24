import mongoose from 'mongoose';
import logger from '../core/logger';
import {
    MONGODB_URL,
    MONGODB_DBNAME,
    MONGODB_AUTH,
    MONGODB_USER,
    MONGODB_PASS,
    MONGODB_WITHPASS,
    APP_NAME,
    NODE_ENV
} from '../core/constants';

const debug = require('debug')(APP_NAME);

function initMongoDBConnection() {
    mongoose.connect(`${MONGODB_URL}/${MONGODB_DBNAME}${MONGODB_AUTH}`, {
        ...(MONGODB_WITHPASS === 'no' ? { user: MONGODB_USER, pass: MONGODB_PASS } : {}),
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    if (NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function mongodbConnected() {
        debug('MongoDB Connected');
        logger.info(`Mongoose default connection open to ${MONGODB_URL}/${MONGODB_DBNAME}`);
    });

    // If the connection throws an error
    mongoose.connection.on('error', function mongodbError(err) {
        debug('MongoDB connection error');
        debug(`${MONGODB_URL}/${MONGODB_DBNAME}`);
        debug(err);
        logger.error(`Mongoose default connection error: ${err.message}`);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function mongodbDisconnected() {
        logger.error('Mongoose default connection disconnected');
        throw new Error('Mongoose disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function sigint() {
        mongoose.connection.close(function mongodbCloseConnectionAttempt() {
            logger.error('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}

export default initMongoDBConnection;
