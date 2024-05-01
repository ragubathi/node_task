// src/routes/products.js

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const passport = require('passport');

// GET /products endpoint
router.get('/products', passport.authenticate('jwt', { session: false }), productsController.getProducts);

module.exports = router;
