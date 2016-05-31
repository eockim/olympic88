var express = require('express');
var router = express.Router();
var app = require('../app.js');
var winston = require('../logs/logger.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
                        title: 'SM: TL',
                        drwNo : app.recent()['drwNo'],
                        firstWinamnt : app.recent()['firstWinamnt'],
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

router.get('/lotto/:number', function(req, res){
    winston.info('req : ' + req);
    var value = app.search('201')['firstWinamnt'];
    res.send('server sending... data...' + value);
});

module.exports = router;
