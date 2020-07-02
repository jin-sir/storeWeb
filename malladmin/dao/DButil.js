var mysql = require("mysql");

function getConncetion () {
  var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "jlf103755",
    port: "3306",
    database: "shopStore"
  });
  return connection;
}

module.exports.getConnection = getConncetion