import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required:[ true, "Please provide password"],
        minlength:  [6, "Password must be at least 6 characters long"]
    },
    name: {
        type: String, 
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: [50, "Name can not be more then 50 characters long"],
        minlength: [3, "Name must be at least 3 charcters long"]
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN', 'EDITOR'],
        default: 'USER'
    }
}, {
    timestamps: true
}
);
const userModel = mongoose.model('User', userSchema);
export default userModel;