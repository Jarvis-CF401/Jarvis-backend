const sequelize = require('./database');
const User = require('../models/user');

const initDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to sync the database:', error);
  }
};

module.exports = initDatabase;
