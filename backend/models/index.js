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

module.exports = {
  Dataset,
  Record,
};
