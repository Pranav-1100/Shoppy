const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false
});

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    await sequelize.sync();
    console.log('Database synchronized and tables created');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, initDatabase };