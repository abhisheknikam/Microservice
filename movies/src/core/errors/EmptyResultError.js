// eslint-disable-next-line prettier/prettier
class EmptyResultError extends Error {
    constructor(message) {
        super(message);
        this.code = 'no_data_found';
        this.status = 404;
    }
}

export default EmptyResultError;
