import mongoose from 'mongoose';
import MovieSchema from '../schemas/MovieSchema';

const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;