// eslint-disable-next-line prettier/prettier
class RootRouteError extends Error {
    constructor(message) {
        super(message);
        this.code = 'invalid_route';
        this.status = 404;
    }
}

export default RootRouteError;
