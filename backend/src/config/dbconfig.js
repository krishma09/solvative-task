const mysql = require('mysql');

const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'peerfive'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;