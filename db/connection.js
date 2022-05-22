const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // removing password before pushing to github
  password: '',
  database: 'staff'
});

module.exports = db;