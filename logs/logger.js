var winston = require('winston');
var logger = new winston.Logger({
    transports : [
      new (winston.transports.Console)({
        level : 'info' // winston console log level
      }),
      new (winston.transports.File)({
        level : 'debug',
        json : false,
        filename : 'log-',
        timestamp : true,
        datePattern : 'yyyy-MM-dd.log'
      })
    ]
});

module.exports = logger;
