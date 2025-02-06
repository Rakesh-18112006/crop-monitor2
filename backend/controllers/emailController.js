const nodemailer = require('nodemailer');
const User = require('../models/User');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

exports.sendVerificationEmail = async (user) => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 min expiry
    await user.save();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Verify Your Email',
        text: `Your OTP for verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
};
