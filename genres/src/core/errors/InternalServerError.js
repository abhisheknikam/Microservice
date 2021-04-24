// eslint-disable-next-line prettier/prettier
class InternalServerError extends Error {
    constructor(message = 'An internal server error occured!') {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.code = 'internal_error';
        this.message = message;
        this.status = 500;
    }
}

export default InternalServerError;
