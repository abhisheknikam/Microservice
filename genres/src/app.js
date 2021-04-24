import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import RootRouteError from './core/errors/RootRouteError';
import handleError from './core/middlewares/handleErrors';
import boot from './boot';

const app = express();

// Boot all required connections
boot();

// security - helmet
app.use(helmet());

// json and urlencoding handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// URL access logs
app.use(morgan('combined'));

// initialize routes
app.use('/', routes);

// handle root routes
// eslint-disable-next-line no-unused-vars
app.use(function handleRoot(req, res, next) {
    next(new RootRouteError('No routes found'));
});

// eslint-disable-next-line no-unused-vars
app.use(handleError);

export default app;
