import {Schema, model} from 'mongoose';

const directorySchema: Schema = new Schema({
    name: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    genere: {
        type: String,
        require: false
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

export const directoryModel = model("directoryModel", directorySchema)