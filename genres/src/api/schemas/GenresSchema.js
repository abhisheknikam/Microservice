import { Schema } from 'mongoose';

const GenresSchema = new Schema(
    {
        id: { type: Schema.Types.String, index: true },
        name: Schema.Types.String,
        description: Schema.Types.String
    },
    { collection: 'genres', timestamps: true, autoIndex: false }
);

export default GenresSchema;
