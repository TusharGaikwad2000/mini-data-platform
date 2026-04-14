const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Record = sequelize.define('Record', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dataset_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'datasets',
      key: 'id',
    },
    onDelete: 'CASCADE'
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  tableName: 'records',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Record;
