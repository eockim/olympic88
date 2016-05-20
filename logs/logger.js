var winston = require('winston');
var options = {
  datePattern : 'yyyy-MM-dd',
  filename : 'log-'
};

winston.add(require('winston-daily-rotate-file'), options);
var logger = new winston.Logger({
    transports : [
      new (winston.transports.Console)({
        level : 'info' // winston console log level
      }),
      new (winston.transports.File)({
        level : 'debug',
        json : false,
        timestamp : true
      })
    ]
});

module.exports = logger;
