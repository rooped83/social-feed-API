import mongoose from 'mongoose';
 const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    text: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    });
    
    const commentModel = mongoose.model('Comment', commentSchema);
    export default commentModel;