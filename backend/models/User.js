const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ['Farmer', 'Buyer'], required: true },
    isVerified: { type: Boolean, default: false },
    googleId: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
});

module.exports = mongoose.model('User', UserSchema);
