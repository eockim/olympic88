var express = require('express');
var router = express.Router();
var app = require('../app.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lottory', lotto : app.recent() });
});

module.exports = router;
