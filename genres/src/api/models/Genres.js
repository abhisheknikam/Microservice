import mongoose from 'mongoose';
import GenresSchema from '../schemas/GenresSchema';

const Genres = mongoose.model('Genres', GenresSchema);
export default Genres;