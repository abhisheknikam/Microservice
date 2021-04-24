import { Router } from 'express';
import cors from 'cors';
import apiRoutes from '../api/routes';

const routes = Router();
routes.use('/api', cors(), apiRoutes);

routes.use('/ping', function healthcheck(req, res) {
    return res.status(200).send('OK');
});

export default routes;
