const express = require('express');
const router = express.Router();
const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);

        // Check if the user already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user 
        const newUser = await User.create({ username, password });



        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
};

// Login Route      
router.post('/login', async (req, res) => {
    try {
        console.log(isProduction, 'isProduction')
        const { username, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ username });

        if (!user || (await bcrypt.compare(password, user.password)) === false) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Create token
        const token = jwt.sign({ user_id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "2h" });

        // Set the token in HTTP-only cookie
        res.cookie('token', token, cookieOptions);

        // Send back user data
        res.status(200).json({ message: "Login successful", user: { username: user.username, id: user._id } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Logout Route
router.get('/logout', (req, res) => {
    // Clear the cookie
    console.log(req.body);

    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
});

// Check Auth Route
router.get('/check-auth', (req, res) => {
    try {
        const token = req.cookies.token;

        console.log(req.body);
        console.log(req.cookies);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (decodedToken.exp * 1000 < new Date().getTime()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = {
            id: decodedToken.user_id,
            username: decodedToken.username,
        }

        res.status(200).json({ user: user });
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
});

module.exports = router;