const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbbiblioteca'
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/alunos', (req, res) => {
  res.send('{"nome":"Guilherme"}');
});

app.post('/alunos', (req, res) => {
  res.send('Executou um post');
});

app.get('/alunos/:id', (req, res) => {
  const id = req.params.id;
  if (id <= 10) {
    res.status(200).send('Aluno localizado com sucesso');
  }
  else {
    res.status(404).send('Aluno não encontrado');
  }
});

app.get('/autor', (req, res) => {
  con.query('SELECT * FROM tbAutor', (erroSQL, result, fields) => {
    if (erroSQL) {
      throw erroSQL;
    }
    res.status(200).send(result);
  });
});

app.get('/autor/:id', (req, res) => {
  const idautor = req.params.id;
  const sql = `SELECT * FROM tbAutor WHERE IdAutor = ?`;
  console.log(sql);
  con.query(sql, [idautor], (erroSQL, result, fields) => {
    if (erroSQL) {
      throw erroSQL;
    }
    if (result.length > 0) {
      res.status(200).send(result);
    }
    else {
      res.status(404).send('Não encontrado');
    }
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
