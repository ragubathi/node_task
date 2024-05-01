// controllers/productsController.js

// Load necessary modules
const Product = require('../models/Product'); // Import the Product model
const Category = require('../models/Category'); // Import the Category model

// Controller function for GET /products endpoint
exports.getProducts = async (req, res) => {
    try {
        // Query parameters for pagination
        const page = parseInt(req.query.page) || 1; // Page number (default: 1)
        const limit = parseInt(req.query.limit) || 10; // Number of items per page (default: 10)
        const skip = (page - 1) * limit; // Calculate offset based on page and limit

        // Query the database for products based on user role
        let products;
        if (req.user.role === 'admin') {
            // List all the products for admin users
            products = await Product.findAll({
                include: [{ model: Category }], // Include category information
                limit: limit,
                offset: skip
            });
        } else {
            // Filter products where stock is "In stock" for customers
            products = await Product.findAll({
                where: {
                    stock: 'In stock'
                },
                include: [{ model: Category }], // Include category information
                limit: limit,
                offset: skip
            });
        }

        // Return paginated products
        res.json(products);
    } catch (err) {
        // Error handling
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
