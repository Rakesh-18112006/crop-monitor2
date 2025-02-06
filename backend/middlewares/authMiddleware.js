const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(verified.id);
        if (!req.user) return res.status(401).json({ message: 'User not found' });
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
