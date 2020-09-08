const mysql = require('mysql');
const fs = require('fs');
const dbConfig = require('./config/db.config');

var con = mysql.createPool({
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'b75db007ef6067',
  password: '6ad296fd',
  database: 'heroku_74c8b7ce5a9f540'
});

module.exports = con;