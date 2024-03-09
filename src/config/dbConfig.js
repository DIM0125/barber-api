// const mysql = require('mysql');
// const connection = mysql.createPool({
//     host     : 'localhost',
//     user     : 'yourusername',
//     password : 'yourpassword',
//     database : 'barbershop'
// });

const { Pool } = require('pg');

const connection = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'barbershop',
    port: 5432,
});

module.exports = connection;
