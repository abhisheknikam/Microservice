import { Router } from 'express';
const routes = Router();

// Middlewares
import cors from 'cors';
import verifyAccessToken from './middlewares/verifyAccessToken';

// Controllers
import MovieController from './controllers/MovieController';

routes.use(cors());
routes.get(
    '/movie-list',
    verifyAccessToken,
    checkAccessCriteria({ module: 'Movie', actions: ['read'] }),
    MovieController.getMovieList
);
routes.get(
    '/movie/:id',
    verifyAccessToken,
    checkAccessCriteria({ module: 'Movie', actions: ['read'] }),
    MovieController.getMovie
);
routes.post(
    '/movie/create',
    verifyAccessToken,
    checkAccessCriteria({ module: 'Movie', actions: ['create'] }),
    MovieController.create
);
routes.put(
    '/movie/:id/update',
    verifyAccessToken,
    checkAccessCriteria({ module: 'Movie', actions: ['update'] }),
    MovieController.update
);
routes.delete(
    '/movie/:id',
    verifyAccessToken,
    checkAccessCriteria({ module: 'Movie', actions: ['delete'] }),
    MovieController.remove
);

export default routes;
