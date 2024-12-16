// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const verifyJWT = (req, res, next) => {
//     const authHeader = req.headers['authorization']; // Corrected header access
//     if (!authHeader) {
//         return res.sendStatus(403); // Missing authorization header
//     }

//     const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>" format

//     jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
//         if (err) {
//             return res.sendStatus(403); // Token invalid or expired
//         }

//         req.user = decoded.username; // Assign the user data to req object
//         next(); // Call next middleware
//     });
// };

// module.exports = verifyJWT;

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.username;
            next();
        }
    );
}

module.exports = verifyJWT