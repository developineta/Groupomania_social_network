// La connexion à la base de données MySQL

const mysql = require('mysql');

exports.connection = mysql.createPool({
  host     : 'localhost',
  user     : `${process.env.DBID}`,
  password : `${process.env.DBP}`,
  database : 'Groupomania',
  timezone : 'local'
});