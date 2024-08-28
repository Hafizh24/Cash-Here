require('dotenv').config()

module.exports = {
  development: {
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DATABASE,
    host: process.env.SQL_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    timezone: '+07:00'
  },
  test: {
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DATABASE,
    host: process.env.SQL_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DATABASE,
    host: process.env.SQL_HOST,
    dialect: 'mysql',
    timezone: '+07:00'
  }
}
