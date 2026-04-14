const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mini_data', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
