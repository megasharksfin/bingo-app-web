const mysql = require('mysql');
const fs = require('fs');
const dbConfig = require('./config/db.config');

var con = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = con;