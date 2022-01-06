
const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/coustomError");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = BigPromise(async (req, res, next) => {

    let token = req.cookies.token;

    if (!token && req.header("Authorization")) {
        token = req.header("Authorization").replace("Bearer ", "");
    }

    if (!token) {
        return next(new CustomError("Login first to access this page", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
});

exports.customRole = (...roles) => {

    return (req, res, next) => {

        console.log("check role -------" + roles);

        if (!roles.includes(req.user.role)) {
            return next(new CustomError("You are not allowed for this resouce", 403));
        }
        next();
    };
};