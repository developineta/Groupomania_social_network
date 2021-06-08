const mysql = require('mysql');

exports.connection = mysql.createPool({
  host     : 'localhost',
  user     : `${process.env.DBID}`,
  password : `${process.env.DBP}`,
  database : 'Groupomania',
  timezone : 'local'
});