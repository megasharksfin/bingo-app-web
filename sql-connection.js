const mysql = require('mysql');
const fs = require('fs');

const { dbconfig } = JSON.parse(fs.readFileSync('./appconfig.json', 'utf-8'));

const con = mysql.createConnection(dbconfig);

con.connect((err) => {
  if (err) {
    throw(err);
  }
});

module.exports = con;