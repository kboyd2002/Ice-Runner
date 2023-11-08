import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306,
  }
);

export default sequelize;
