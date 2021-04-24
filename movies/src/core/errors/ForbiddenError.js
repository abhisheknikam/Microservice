// eslint-disable-next-line prettier/prettier
class ForbiddenError extends Error {
    constructor(message = 'You dont have permission for this operation') {
        super();
        this.code = 'permission_denied';
        this.message = message;
        this.status = 403;
    }
}

export default ForbiddenError;
