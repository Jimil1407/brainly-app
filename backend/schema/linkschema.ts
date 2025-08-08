import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
        required: false // Made optional for shareAll functionality
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['individual', 'shareAll'],
        default: 'individual'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const links = mongoose.model('Link', linkSchema);

export default links;