import { createLogger, format, transports } from 'winston';
import { LOG_LEVEL, NODE_ENV } from './constants';

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label: _label, timestamp: _timestamp }) => {
    return `${_timestamp} [${_label}] ${level}: ${message}`;
});
require('winston-daily-rotate-file');

const dailyRotateFileTransport = filename =>
    new transports.DailyRotateFile({
        filename: `${__dirname}/../../logs/%DATE%-${filename}.log`,
        maxSize: '20m',
        maxDays: '3d',
        zippedArchive: true,
        datePattern: 'YYYY-MM-DD'
    });

const logger = createLogger({
    level: LOG_LEVEL,
    format: format.json(),
    transports: [
        new transports.Console({
            level: LOG_LEVEL,
            format: combine(label({ label: '>>>' }), timestamp(), myFormat)
        }),
        ...(NODE_ENV !== 'production' ? [dailyRotateFileTransport(NODE_ENV)] : [])
    ]
});

export default logger;
