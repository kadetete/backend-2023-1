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

con.connect((err) => {
  if (err) {
    throw err;
  }
  con.query('SELECT * FROM tbAutor',(err, result, fields) => {
    if (err) {
      throw err;
    }
    console.log(result);
  });
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
  else{
    res.status(404).send('Aluno não encontrado');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
