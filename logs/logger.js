var winston = require('winston');

var logger = new winston.Logger({
    transports : [
      new (winston.transports.Console)({
        level : 'info' // winston console log level
      }),
      new (winston.transports.File)({
        level : 'debug',
        json : false,
        timestamp : true,
        filename : 'logs-' + getDay() + '.log',
        dirname : __dirname
      })
    ]
});

function getDay(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd < 10) {
      dd = '0' + dd;
  }

  if(mm < 10) {
      mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;

  return today

}

module.exports = logger;
