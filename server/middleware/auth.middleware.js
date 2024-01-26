const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const cookie = require('cookie');


const verifyToken = async (req, res, next) => {
    try {
        console.log(req.headers, 'req.headers');
        console.log(req.cookies, 'req.cookies');
        const token = req.cookies.token;
        console.log(token, 'token');

        if (!token) {
            return res.status(401).json({ message: "No Token" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        const user = await User.findById(decodedToken.user_id);

        if (!user) {
            return res.status(401).json({ message: "Token but unauthorised" });
        }
        req.user = user;
        console.log(req.user, 'req.user');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorised' });
    }
}

module.exports = verifyToken;