import InternalServerError from '../../core/errors/InternalServerError';
import Movie from '../models/Movie';
import logger from '../../core/logger';
import throwError from '../../core/helpers/generateResponse';

class MovieController {
    /**
     * Description: Function returns all genres
     * Method: GET
     */
    static async getMovieList(req, res, next) {
        logger.info('Movie List function called.');
        try {
            const { query } = req;
            const { pageNumber, size } = query;
            const limit = parseInt(size, 10);
            const skip = size * pageNumber - size;

            const result = await Movie.find({ isDeleted: false })
                .select('*')
                .limit(limit)
                .skip(skip)
                .exec();

            const resArr = {
                code: '',
                status: 200,
                message: 'Movie found',
                success: true,
                error: '',
                data: result
            };
            logger.info('Movie List function exit.');
            return res.send(resArr);
        } catch (error) {
            logger.error(error.message);
            const err = new InternalServerError();
            err.stack = error.stack;
            return next(err);
        }
    }

    /**
     * Description: Function returns single genres by id.
     * Method: GET
     */
    static async getMovie(req, res, next) {
        logger.info('Get Movie function called.');
        try {
            const { params } = req;
            if (!params.id) {
                throwError('Id missing, operation failed.', next);
            }
            const result = await Users.find({ _id: params.id, isDeleted: false })
                .exec();
            const resArr = {
                code: '',
                status: 200,
                message: 'Movie Found',
                success: true,
                error: '',
                data: result
            };
            logger.info('Get Movie function exit.');
            return res.send(resArr);
        } catch (error) {
            logger.error(error.message);
            const err = new InternalServerError();
            err.stack = error.stack;
            return next(err);
        }
    }

    /**
     * Description: Function create Movie.
     * Method: POST
     */

    static async create(req, res, next) {
        logger.info('Movie Create function called.');
        try {
            const bodyParam = req.body ? req.body : throwError('Empty Data.', next);
            const insertObj = new Movie({
                name: bodyParam.name,
                description: bodyParam.description,
                releaseDate: bodyParam.releaseDate,
                genres: bodyParam.genres,
                duration: bodyParam.duration,
                rating: bodyParam.rating
            });

            insertObj.save((err, result) => {
                if (err) {
                    throwError('Error occurred, Movie not added.', next);
                } else {
                    const resArr = {
                        code: '',
                        status: 200,
                        message: 'Movie Added.',
                        success: true,
                        error: ''
                    };
                    logger.info('Movie Create function exit.');
                    return res.send(resArr);
                }
            });
        } catch (error) {
            logger.error(error.message);
            const err = new InternalServerError();
            err.stack = error.stack;
            return next(err);
        }
    }

    /**
     * Description: Function update Movie by id.
     * Method: PUT
     */
    static update(req, res, next) {
        logger.info('Movie Update function called.');
        try {
            const bodyParam = req.body ? req.body : throwError('Empty Data.', next);
            const { params } = req;
            if (!params.id) {
                throwError('Id missing, update operation failed.', next);
            }
            Movie.findOneAndUpdate(
                { _id: params.id },
                {
                    $set: {
                        name: bodyParam.name,
                        description: bodyParam.description,
                        releaseDate: bodyParam.releaseDate,
                        genres: bodyParam.genres,
                        duration: bodyParam.duration,
                        rating: bodyParam.rating
                    }
                },
                { new: false },
                function updateMovieResult(err, result) {
                    if (err) {
                        throwError(err.message, next);
                    }
                    const resArr = {
                        code: '',
                        status: 200,
                        message: 'Movie Updated.',
                        success: true,
                        error: ''
                    };
                    logger.info('Movie Update function exit.');
                    return res.send(resArr);
                }
            );
        } catch (error) {
            logger.error(error.message);
            const err = new InternalServerError();
            err.stack = error.stack;
            return next(err);
        }
    }

    /**
     * Description: Function to remove Movie by id.
     * Method: DELETE
     */
    static remove(req, res, next) {
        logger.info('Movie Remove function called.');
        try {
            const { params } = req;
            if (!params.id) {
                throwError('Id missing, remove operation failed.', next);
            }
            Movie.findOneAndRemove({ _id: params.id }, function findOneAndRemoveResult(
                err,
                result
            ) {
                if (err) {
                    throwError(err.message, next);
                }
                let msg = 'Movie Removed';
                let successFlag = true;
                let errorMsg = '';
               
                const resArr = {
                    code: '',
                    status: 200,
                    message: msg,
                    success: successFlag,
                    error: errorMsg
                };
                logger.info('Movie Remove function exit.');
                return res.send(resArr);
            });
        } catch (error) {
            logger.error(error.message);
            const err = new InternalServerError();
            err.stack = error.stack;
            return next(err);
        }
    }

    // get the count of Movie
    static async getMovieCount(req, res, next) {
        logger.info('Movie Count function Called.');
        try {

            const count = await Movie.countDocuments().exec();
            return res.send({
                success: true,
                msg: 'Total Movie count..',
                count
            });

        } catch (error) {
            logger.error(error.message);
            const err = new InternalServerError();
            err.stack = error.stack;
            return next(err);
        }
    }
}
export default MovieController;
