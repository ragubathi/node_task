const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category'); // Import the Category model

// Define the Product model
const Product = sequelize.define('products', {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
            model: 'categories', // Referencing the 'categories' table
            key: 'id' // Using the 'id' column as a reference
        }
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Define association with Category
Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product; // Export the Product model
