// src/routes/auth.js

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Load User model
const User = require('../models/User');

// Middleware function for validating user input
const validateUserInput = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    next(); // Proceed to the next middleware if validation passes
};

// Register route with server-side validation
router.post('/register', validateUserInput, async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        const newUser = await User.create({ username, password, role });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login route with server-side validation
router.post('/login', validateUserInput, async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        try {
            if (err || !user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            req.login(user, { session: false }, async (err) => {
                if (err) {
                    return next(err);
                }
                const token = jwt.sign({ id: user.id }, 'D3d8#*9aBv7!sXf2');
                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

// Export router
module.exports = router;
