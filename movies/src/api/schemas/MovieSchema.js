import { Schema } from 'mongoose';

const MovieSchema = new Schema(
    {
        id: { type: Schema.Types.String, index: true },
        name: Schema.Types.String,
        description: Schema.Types.String,
        releaseDte:Schema.Types.Date,
        genres:Schema.Types.String,
        duration:Schema.Types.Date,
        rating:Schema.Types.String,
    },
    { collection: 'movie', timestamps: true, autoIndex: false }
);

export default MovieSchema;
