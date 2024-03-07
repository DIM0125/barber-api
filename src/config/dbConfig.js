const mysql = require('mysql');
const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'yourusername',
    password : 'yourpassword',
    database : 'barbershop'
});

module.exports = connection;
