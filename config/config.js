require('dotenv').config();

const mysql = require('mysql2');

const baseConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PSSWORD,
  database: process.env.DB_DATABASE_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DIALECT,
  dialectModule: mysql,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = {
  development: {
    ...baseConfig
  },
  production: {
    ...baseConfig,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
