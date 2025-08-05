import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const links = mongoose.model('Link', linkSchema);

export default links;