// const sequelize = require('./config/db');
// const { Dataset, Record } = require('./models');

// async function syncAndSeed() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');

//     // Sync all models with alter: true for development
//     await sequelize.sync({ alter: true });
//     console.log('All models were synchronized successfully.');

//     // Seed function execution
//     const dataset = await Dataset.create({
//       name: 'Sample Users Dataset',
//       file_type: 'json',
//     });
//     console.log('Created dataset:', dataset.toJSON());

//     const records = await Record.bulkCreate([
//       { dataset_id: dataset.id, data: { user: 'Alice', age: 30, city: 'London' } },
//       { dataset_id: dataset.id, data: { user: 'Bob', age: 25, city: 'New York' } },
//       { dataset_id: dataset.id, data: { user: 'Charlie', age: 35, city: 'Paris' } },
//     ]);
//     console.log(`Created ${records.length} records linked to the dataset.`);

//   } catch (error) {
//     console.error('Unable to connect to the database or sync:', error);
//   } finally {
//     await sequelize.close();
//   }
// }

// syncAndSeed();
