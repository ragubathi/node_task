const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product'); // Import the Product model

// Define the Category model
const Category = sequelize.define('categories', {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = Category; // Export the Category model
