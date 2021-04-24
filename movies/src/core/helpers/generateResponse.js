import logger from '../logger';

export default function throwError(errMsg, next) {
    logger.error(errMsg);
    const errorObj = new Error(errMsg);
    return next(errorObj);
}
