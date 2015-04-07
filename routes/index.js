var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
   
    title: 'Express', 
    body:  'Hola amigos gracias por estar aqui'

  });
});


router.get('/todo', function(req, res, next) {
  res.render('index', { 
   
    title: 'Express', 
    body:  'Hola amigos gracias por estar aqui'

  });
});
module.exports = router;
