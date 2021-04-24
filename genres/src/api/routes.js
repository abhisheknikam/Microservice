import { Router } from 'express';
const routes = Router();

// Middlewares
import cors from 'cors';
import verifyAccessToken from './middlewares/verifyAccessToken';

// Controllers
import GenresController from './controllers/GenresController';

routes.use(cors());
routes.get(
    '/genres-list',
    verifyAccessToken,
    checkAccessCriteria({ module: 'Genres', actions: ['read'] }),
    GenresController.getGenresList
);
routes.get(
    '/genres/:id',
    verifyAccessToken,
    checkAccessCriteria({ module: 'Genres', actions: ['read'] }),
    GenresController.getGenres
);
routes.post(
    '/genres/create',
    verifyAccessToken,
    checkAccessCriteria({ module: 'Genres', actions: ['create'] }),
    GenresController.create
);
routes.put(
    '/genres/:id/update',
    verifyAccessToken,
    checkAccessCriteria({ module: 'Genres', actions: ['update'] }),
    GenresController.update
);
routes.delete(
    '/genres/:id',
    verifyAccessToken,
    checkAccessCriteria({ module: 'Genres', actions: ['delete'] }),
    GenresController.remove
);

export default routes;
