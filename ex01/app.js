const express = require('express');
const mysql = require('mysql');
const app = express();

// Configuração da conexão com o banco de dados MySQL

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'algumbd'
});

// Conecta-se ao BD

connection.connect(function (err) {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectando ao banco de dados MySQL!');
});

// Rota para buscar os usuários
app.get('/users', function (req, res) {
    connection.query('SELECT * FROM users', function (err, rows) {
        if (err) {
            console.log('Erro ao consultar:', err);
            return;
        }
        res.json(rows);
    });
});

// Inicia o servidor

app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});