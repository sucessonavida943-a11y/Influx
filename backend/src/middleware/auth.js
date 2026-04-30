const jwt = require('jsonwebtoken');

// Middleware to protect routes
function authenticateToken(req, res, next) {
    // Get token from the headers
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.sendStatus(401); // Unauthorized

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;