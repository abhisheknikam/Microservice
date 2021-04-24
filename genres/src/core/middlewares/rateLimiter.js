import { RateLimiterMongo } from 'rate-limiter-flexible';
import mongoose from 'mongoose';

const rateLimiter = new RateLimiterMongo({
    storeClient: mongoose.connection,
    keyPrefix: 'rateLimitFlex',
    points: 100, // 10 requests
    duration: 1 // per 1 second by IP
});

const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter
        .consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).send('Too Many Requests');
        });
};

export default rateLimiterMiddleware;
