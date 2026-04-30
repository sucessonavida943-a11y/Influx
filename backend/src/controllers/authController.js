// authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
async function register(req, res) {
    const { username, password } = req.body;
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Create new user
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
}

// Login
async function login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
}

// Logout
async function logout(req, res) {
    // Logout logic (e.g., invalidate the JWT or handle sessions)
    res.status(200).json({ message: 'User logged out' });
}

// Token Refresh
async function refreshToken(req, res) {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        const newToken = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token: newToken });
    });
}

module.exports = { register, login, logout, refreshToken };