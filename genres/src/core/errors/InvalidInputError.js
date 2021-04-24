// eslint-disable-next-line prettier/prettier
class InvalidInputError extends Error {
    constructor(message, errors = null) {
        super(message);
        this.code = 'invalid_input';
        this.status = 400;
        this.errors = errors;
    }
}

export default InvalidInputError;
