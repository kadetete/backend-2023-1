var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/teste', function(req, res) {
  res.send('Meu novo método muito do massa kkkkkkkkkkkkkkkkkkkkk')
})

module.exports = router;
