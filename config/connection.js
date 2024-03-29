const Sequelize = require('sequelize');
require('dotenv').config();
if(process.env.JAWSDB_URL) {
  sequelize = new Sequelize (process.env.JAWSDB_URL)
} else {
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.PORT || 3306,
  }
);
};
module.exports = sequelize;
