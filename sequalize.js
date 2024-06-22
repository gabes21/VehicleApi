import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  pool: {
    min: 0,
    max: 10,
    acquire: 30000,
    idle: 10000
  }
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    console.log('Connected to database:', sequelize.config.database);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;