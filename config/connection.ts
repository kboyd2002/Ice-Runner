import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize
