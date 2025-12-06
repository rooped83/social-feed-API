import mongoose from 'mongoose';
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for the post"],
        trim: true,
        manlength: [100, "Title can not be more then 100 charachters long"],
        minlength:[3, "Title must be at least 3 charchters long"]  
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Please provide a category for the post"],
        enum: ["tech", "sport", "science", "politics", "entertainment", "others" ],
        default: "others"

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
}

);
const postModel = mongoose.model('Post', postSchema);
export default postModel;