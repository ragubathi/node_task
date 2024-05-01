// src/routes/users.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const passport = require('passport');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to next middleware
    } else {
        res.status(403).json({ message: 'Unauthorized, Customers are not allowed to view the users' }); // User is not admin, send forbidden response
    }
};

// GET /users endpoint - Restricted to admin only
router.get('/users', passport.authenticate('jwt', { session: false }), isAdmin, usersController.getAllUsers);

module.exports = router;
