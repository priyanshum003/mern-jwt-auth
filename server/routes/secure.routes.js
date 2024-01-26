const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');

router.get('/dashboard', verifyToken, (req, res) => {
    const user = req.user;
    console.log(user);
    res.json({ message: "This is the dashboard", user: user });
});

module.exports = router;