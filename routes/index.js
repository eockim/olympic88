var express = require('express');
var router = express.Router();
var app = require('../app.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
                        title: 'Lottory',
                        no1 : app.recent()['drwtNo1'],
                        no2 : app.recent()['drwtNo2'],
                        no3 : app.recent()['drwtNo3'],
                        no4 : app.recent()['drwtNo4'],
                        no5 : app.recent()['drwtNo5'],
                        no6 : app.recent()['drwtNo6'],
                        bonus : app.recent()['bnusNo']
                      }
            );
});

module.exports = router;
