var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ckdwns62",
  database : 'sound_wave_v1'
});

module.exports = connection;
