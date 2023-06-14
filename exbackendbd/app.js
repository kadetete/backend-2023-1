const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'exbackend'
});

connection.connect(function(err) {
    if (err) {
        console.error('Erro ao conectar banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados!')
});

app.get('/users', function(req, res) {
    connection.query('SELECT * FROM usuarios', function(err, rows) {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            return;
        }
        res.json(rows);
    });
});

app.listen(3000, function() {
    console.log('Servidor está rodando na porta 3000');
});