import jwt from 'jsonwebtoken';
import logger from '../../core/logger';
import { JWT_SECRET } from '../../core/constants';

export default async function verifyAccessToken(req, res, next) {
    const authHeaders = req.headers.authorization || req.headers.Authorization || null;
    if (!authHeaders) {
        return res.json({
            status: 403,
            code: 'token_missing',
            success: false,
            message: 'Token is required for access'
        });
    }
    const accessToken = authHeaders.split(' ')[1];
    return jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
        if (err) {
            logger.error(err.name);
            logger.error(err.stack);

            let code = 'jwt_error';
            let status = 500;
            let message = 'Internal server error';
            switch (err.name) {
                case 'TokenExpiredError':
                    code = 'token_expired';
                    message = 'Token session expired';
                    status = 403;
                    break;
                case 'SyntaxError':
                case 'JsonWebTokenError':
                    code = 'invalid_token';
                    message = 'Invalid token';
                    status = 405;
                    break;
                default:
                    break;
            }

            return res.json({
                success: false,
                code,
                status,
                message
            });
        }

        req.currentUser = decoded;
        return next();
    });
}
