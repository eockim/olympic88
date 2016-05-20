var winston = require('winston');
<<<<<<< HEAD
var options = {
  datePattern : 'yyyy-MM-dd',
  filename : 'log-'
};

winston.add(require('winston-daily-rotate-file'), options);
=======

>>>>>>> 3c6871ac3c3bb1163b12bdd1dee11e4d7b1ea534
var logger = new winston.Logger({
    transports : [
      new (winston.transports.Console)({
        level : 'info' // winston console log level
      }),
      new (winston.transports.File)({
        level : 'debug',
        json : false,
<<<<<<< HEAD
        timestamp : true
=======
        timestamp : true,
        filename : 'logs-' + getDay() + '.log',
        dirname : __dirname
>>>>>>> 3c6871ac3c3bb1163b12bdd1dee11e4d7b1ea534
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
