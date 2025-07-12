const JWT = require('jsonwebtoken');
// Middleware to authenticate requests using JWT and extract user ID
function AuthWithJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    // Check if the authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        // Verify the JWT token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        // Attach the user information to the request object
        req.Id = decoded.Id;
        next(); // Call the next middleware or route handler
    } catch (e) {
        return res.status(401).json({
             message: 'Unauthorized',
             error: e
            });
    }
}
module.exports = AuthWithJWT;