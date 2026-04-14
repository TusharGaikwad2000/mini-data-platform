const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Dataset = sequelize.define('Dataset', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  file_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: 'datasets',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Dataset;
