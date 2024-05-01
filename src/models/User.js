const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

// Define the User model
const User = sequelize.define('users', {
    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'customer'),
        allowNull: false,
        defaultValue: 'customer'
    }
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    hooks: {
        // Hook to hash the password before creating a new user
        beforeCreate: async (user) => {
            console.log('beforeCreate', user);
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        }
    }
});

// Method to check if a provided password matches the user's hashed password
User.prototype.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User; // Export the User model
