
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbbiblioteca',
});

con.connect((erroConexao) => {
  if (erroConexao) {
    throw erroConexao;
  }
});

router.get('/', (req, res) => {
  con.query('SELECT * FROM tbeditora', (erroComandoSQL, result, fields) => {
    if (erroComandoSQL) {
      throw erroComandoSQL;
    }
    res.status(200).send(result);
  });
});

router.get('/:id', (req, res) => {
  const idEditora = req.params.id;
  con.query('SELECT * FROM tbeditora WHERE IdEditora = ?', [idEditora], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }

      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Não encontrado');
      }
    }
  );
});

module.exports = router;