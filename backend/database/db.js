const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});
var mysql = require('mysql');

var pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME
});

module.exports = pool;