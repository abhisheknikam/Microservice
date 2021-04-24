// eslint-disable-next-line prettier/prettier
class InvalidCredentialError extends Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.code = 'invalid_credential';
        this.status = 401;
        this.message = message;
    }
}

export default InvalidCredentialError;
