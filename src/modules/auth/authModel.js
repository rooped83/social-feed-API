import mongoose from 'mongoose';
const verificationCodeSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    hashedCode: {
        type: String,
        required: true
    },
    expirationTime: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['email verification', 'forgot password', 'password reset']
    },
    used: {
        type: Boolean,
        default: false
    }
    });
    // TTL index on expirationTime field to auto-delete expired records: 
    verificationCodeSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });

    const verificationCodeModel = mongoose.model('VerificationCode', verificationCodeSchema);

    export default verificationCodeModel