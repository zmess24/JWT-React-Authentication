const 
    jwt = require('jsonwebtoken'),
    User = require('./models/User'),
    { JWT_SECRET } = process.env;

// Function for creating tokens.
function signToken(user) {
    const userData = user.toObject(); // Convert user document from mongo to basic JS Object.
    delete userData.password; // Delete the password property from the object.
    return jwt.sign(userData, JWT_SECRET); // Create token with the user data and the secret.
};

// Middleware function for verifying tokens and protecting routes.
function verifyToken(req, res, next) {
    // Grab token from either the headers, the body, or query string.
    const token = req.get('token') || req.body.token || req.query.token;
    // If no token present, deny access.
    if (!token) return res.json({ success: false, message: "No Token Provided." });
    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
        if (err) res.json({ success: false, message: "Invalid Token" });

        User.findById(decodedData._id, (err, user) => {
            if (!user) return res.json({ success: false, message: "Invalid Token" });
            req.user = user; // And the user to the request object.
            next(); // Go on to the next middleware/route.
        })
    })
};

// Export both functions to made available elsewhere in our application.
module.exports = { signToken, verifyToken };