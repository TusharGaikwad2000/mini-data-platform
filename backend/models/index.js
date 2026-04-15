const Dataset = require('./dataset.model');
const Record = require('./record.model');

Dataset.hasMany(Record, {
  foreignKey: 'dataset_id',
  as: 'records',
});

Record.belongsTo(Dataset, {
  foreignKey: 'dataset_id',
  as: 'dataset',
});

const sequelize = require('../config/db');

module.exports = {
  sequelize,
  Dataset,
  Record,
};
