import InternalServerError from '../../core/errors/InternalServerError';
import Genres from '../models/Genres';
import logger from '../../core/logger';
import throwError from '../../core/helpers/generateResponse';

class GenresController {
    /**
     * Description: Function returns all genres
     * Method: GET
     */
    static async getGenresList(req, res, next) {
        logger.info('Genres List function called.');
        try {
            const { query } = req;
            const { pageNumber, size } = query;
            const limit = parseInt(size, 10);
            const skip = size * pageNumber - size;

            const result = await Genres.find({ isDeleted: false })
                .select('name description')
                .limit(limit)
                .skip(skip)
                .exec();

            const resArr = {
                code: '',
                status: 200,
                message: 'Genres found',
                success: true,
                error: '',
                data: result
            };
            logger.info('Genres List function exit.');
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
    static async getGenres(req, res, next) {
        logger.info('Get Genres function called.');
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
                message: 'Genres Found',
                success: true,
                error: '',
                data: result
            };
            logger.info('Get Genres function exit.');
            return res.send(resArr);
        } catch (error) {
            logger.error(error.message);
            const err = new InternalServerError();
            err.stack = error.stack;
            return next(err);
        }
    }

    /**
     * Description: Function create Genres.
     * Method: POST
     */

    static async create(req, res, next) {
        logger.info('Genres Create function called.');
        try {
            const bodyParam = req.body ? req.body : throwError('Empty Data.', next);
            const insertObj = new Genres({
                name: bodyParam.name,
                description: bodyParam.description
            });

            insertObj.save((err, result) => {
                if (err) {
                    throwError('Error occurred, Genres not added.', next);
                } else {
                    const resArr = {
                        code: '',
                        status: 200,
                        message: 'Genres Added.',
                        success: true,
                        error: ''
                    };
                    logger.info('Genres Create function exit.');
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
     * Description: Function update Genres by id.
     * Method: PUT
     */
    static update(req, res, next) {
        logger.info('Genres Update function called.');
        try {
            const bodyParam = req.body ? req.body : throwError('Empty Data.', next);
            const { params } = req;
            if (!params.id) {
                throwError('Id missing, update operation failed.', next);
            }
            Genres.findOneAndUpdate(
                { _id: params.id },
                {
                    $set: {
                        name: bodyParam.name,
                        description: bodyParam.description
                    }
                },
                { new: false },
                function updateGenresResult(err, result) {
                    if (err) {
                        throwError(err.message, next);
                    }
                    const resArr = {
                        code: '',
                        status: 200,
                        message: 'Genres Updated.',
                        success: true,
                        error: ''
                    };
                    logger.info('Genres Update function exit.');
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
     * Description: Function to remove Genres by id.
     * Method: DELETE
     */
    static remove(req, res, next) {
        logger.info('Genres Remove function called.');
        try {
            const { params } = req;
            if (!params.id) {
                throwError('Id missing, remove operation failed.', next);
            }
            Genres.findOneAndRemove({ _id: params.id }, function findOneAndRemoveResult(
                err,
                result
            ) {
                if (err) {
                    throwError(err.message, next);
                }
                let msg = 'Genres Removed';
                let successFlag = true;
                let errorMsg = '';
               
                const resArr = {
                    code: '',
                    status: 200,
                    message: msg,
                    success: successFlag,
                    error: errorMsg
                };
                logger.info('Genres Remove function exit.');
                return res.send(resArr);
            });
        } catch (error) {
            logger.error(error.message);
            const err = new InternalServerError();
            err.stack = error.stack;
            return next(err);
        }
    }

    // get the count of Genres
    static async getGenresCount(req, res, next) {
        logger.info('Genres Count function Called.');
        try {

            const count = await Genres.countDocuments().exec();
            return res.send({
                success: true,
                msg: 'Total Genres count..',
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
export default GenresController;
