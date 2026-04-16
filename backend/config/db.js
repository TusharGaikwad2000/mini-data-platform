const { Sequelize } = require('sequelize');

// Using the exact credentials found in your old raw pg config file!
const sequelize = new Sequelize('mini-data-platform-01', 'postgres', 'tushar', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
