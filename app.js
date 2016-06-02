var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var routes = require('./routes/index');
var users = require('./routes/users');
var winston = require('./logs/logger.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//port setup
app.set('port', process.env.PORT || 9000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// lotto request
var options = {
    //port: 1337,
    method : 'GET',
    hostname: 'www.nlotto.co.kr',
    path: '/common.do?method=getLottoNumber&drwNo='
    /*headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }*/
};

var lottory = module.exports;
var req = http.request(options, function(res){

  var recentLotto = {};

  res.setEncoding('utf8');

  res.on('data',  function(chunk){

    recentLotto = JSON.parse(chunk);

    winston.info('chunk : ' + chunk)
    winston.info('bonus No : '  + recentLotto['bnusNo']);
    winston.info('No1 : '  + recentLotto['drwtNo1']);
    winston.info('No2 : '  + recentLotto['drwtNo2']);
    winston.info('No3 : '  + recentLotto['drwtNo3']);
    winston.info('No4 : '  + recentLotto['drwtNo4']);
    winston.info('No5 : '  + recentLotto['drwtNo5']);
    winston.info('No6 : '  + recentLotto['drwtNo6']);

    //export recent()
    lottory.recent = function(){
      return recentLotto;
    };
    winston.debug('lotto json : ' + recentLotto );
  })

});
req.on('error', function(e){
  winston.debug('problem with request ' + e.message);
})
req.end();

lottory.search = function(value){

  winston.info('value : ' + value);

  options.path += value;
  var searchLotto = {};
  var get = http.get(options, function(res, err){

    if(err){
      winston.error('error : ' + err);
    }
    res.setEncoding('utf8');

    winston.info('response : ' + res);

    res.on('data', function(chunk){
        searchLotto = JSON.parse(chunk);
        winston.info('lotto search data : ' + searchLotto['firstWinamnt']);
    });

  });
  if(get.end() ){
      winston.info('res.end');
      return searchLotto['firstWinamnt'];
  }

}

var server = app.listen(app.get('port'), function(){
  winston.info('Express server listening on port : ' + server.address().port);
});


module.exports = app;
