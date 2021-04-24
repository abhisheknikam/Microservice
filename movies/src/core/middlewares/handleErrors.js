import logger from '../logger';
import { NODE_ENV } from '../constants';
// eslint-disable-next-line no-unused-vars
function handleUnknownError(err, req, res, next) {
    logger.error(err.message);
    logger.error(err.stack);
    if (err.formErrors) {
        logger.error(err.formErrors);
    }
    return res.status(err.status || 500).json({
        success: false,
        message: err.message || 'An error occured! Contact customer care',
        ...(NODE_ENV !== 'production' ? { errStack: err.stack } : err),
        ...(err.errors ? { errors: err.errors } : {}),
        ...(err.data ? { data: err.data } : {}),
        code: err.code || 'internal_server_error'
    });
}

export default handleUnknownError;
