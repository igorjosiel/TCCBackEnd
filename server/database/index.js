const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'meu_mercado'
});

module.exports = db;