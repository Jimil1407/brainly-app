import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const contents = mongoose.model('Content', contentSchema);

export default contents;