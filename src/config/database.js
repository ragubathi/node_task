// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_task', 'postgres', 'n(u4vQ5NLSDa2', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
