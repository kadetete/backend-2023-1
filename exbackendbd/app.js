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

app.get('/usuarios', function(req, res) {
    connection.query('SELECT codusuarios, nomeusuario, loginname FROM usuarios', function(err, rows) {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            return;
        }
        res.json(rows);
    });
});

app.get('/usuarios/:id', function(req, res) {
    const id = req.params['id'];
    connection.query('SELECT codusuarios, nomeusuario, loginname FROM usuarios WHERE codusuarios = ?', [id], function(err, rows) {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            return;
        }
        res.json(rows[0]);
    });
});

app.listen(3000, function() {
    console.log('Servidor está rodando na porta 3000');
});