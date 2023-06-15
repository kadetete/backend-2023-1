const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

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

function gerarToken(payload) {
    const senhaToken = 'IFRN2@23';
    return jwt.sign(payload, senhaToken, {expiresIn: 20});
}

app.post('/login', function(req, res) {
    const loginname = req.body.loginname;
    const password = req.body.password;
    connection.query('SELECT nomeusuario FROM usuarios WHERE loginname = ? AND password = ?',
    [loginname, password], function(err, rows) {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            return;
        }
        else {
            if (rows.length > 0) {
                const payload = { nomeusuario: rows[0].nomeusuario };
                const token = gerarToken(payload);
                res.json({ acessToken: token });
            }
            else {
                res.status(403).json({ mensagemErro: 'Usuario ou senha inválidos' });
            }   
        }       
    });
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