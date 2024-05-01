// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const sequelize = require('./config/database');
require('./config/passport'); 
// Import route handlers
const authRoutes = require('./routes/auth'); // Import auth routes
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

// Initialize Express application
const app = express();

// Set port to either environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(passport.initialize()); // Initialize Passport for authentication
app.use(express.json()); // Parse JSON bodies using Express middleware

// Connect to the database
sequelize.authenticate()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err));

// Routes setup
app.use('/auth', authRoutes); // Use auth routes
app.use(productsRoutes); // Use products routes
app.use(usersRoutes); // Use users routes

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
