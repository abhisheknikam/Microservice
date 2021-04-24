// eslint-disable-next-line prettier/prettier
class ServerProconditionFailed extends Error {
    constructor(message, errors = null, data) {
        super(message);
        this.code = 'server_precondition_failed';
        this.status = 412;
        this.errors = errors;
        this.data = data;
    }
}

export default ServerProconditionFailed;
