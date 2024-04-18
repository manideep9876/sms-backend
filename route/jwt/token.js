const jwt = require("jsonwebtoken")
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startswith('Bearer')) {
        return res.status(401).json({ message: 'Unauthorized:bearer token missing or invalid' });
    }
    const token = authHeader.split('')[1];
    jwt.verift(token, 'my-secretkey', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized:invalid token' });
        }
        req.user = decoded;
        next();
    });
};
module.exports = verifyToken