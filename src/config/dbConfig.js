const mysql = require('mysql2/promise');

// const connection = mysql.createPool({
//     host: 'us-cluster-east-01.k8s.cleardb.net',
//     port: 3306,
//     user: 'b498ed9a687df3',
//     password: '5ae95c2d',
//     database: 'heroku_576c75a5243ebc8',
//     waitForConnections: true,
//     connectionLimit: 5,
//     queueLimit: 0
// })

async function closeAllConnections() {
    await connection.end();
    console.log('Todas as conexões foram encerradas.');
}

process.on('SIGINT', async () => {
    await closeAllConnections();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await closeAllConnections();
    process.exit(0);
});


const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'toca-da-barba'
})

module.exports = connection;
