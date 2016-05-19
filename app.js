var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var routes = require('./routes/index');
var users = require('./routes/users');

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

var winston = require('./logs/logger.js');

//logger.add(winston.transports.File).remove(winston.transports.Console);
//logger.remove(winston.transports.Console);

winston.info('information');
winston.debug('debug log');

var lottory = module.exports;
var req = http.request(options, function(res){

  var recentLotto = {};

  res.setEncoding('utf8');

  res.on('data',  function(chunk){
    recentLotto = chunk;
    //export recent()
    lottory.recent = function(){
      return recentLotto;
    };
    console.log('lotto json : ' + recentLotto );
  })

});
req.on('error', (e) =>{
  console.log('problem with request ${e.message}');
})
req.end();

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port : ' + server.address().port);
});


module.exports = app;
