const jwt = require("jsonwebtoken");
const register = require("../Model/UserModel");
require('dotenv').config();

const auth = async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization;
            if (token) {
                token = token.split(" ")[1];
                const decoded = jwt.verify(token, process.env.SECRET_KEY); // Corrected this line

                // Now, you should have access to the user ID in `decoded.id`
                const user = await register.findById(decoded.id).select("-password");

                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: "User not found",
                    });
                }

                // Attach the user object to the request for later use
                req.user = user;
                next();
            } else {
                res.status(401).json({
                    success: false,
                    message: "No token provided",
                });
            }
        } catch (error) {
            res.status(401).json({
                success: false,
                message: "Token verification failed",
                error: error.message, // Use error.message to get the specific error message
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }
};

module.exports = auth;
