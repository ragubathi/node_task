const User = require('../models/User'); // Import the User model

// Controller function for GET /users endpoint
exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.findAll();

        // Return the list of users
        res.json(users);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
