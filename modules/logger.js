/**
 * @fileOverView: logger
 * @author: xuejian.xu
 * @date: 2017/6/13.
 */

var log4js = require('log4js');

log4js.configure({
    appenders: [
        {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '[%r] [%[%5.5p%]] - %m%n'
            }
        },
        {
            type: "dateFile",                 // 日志文件类型，可以使用日期作为文件名的占位符
            filename: "./logs/",     // 日志文件名，可以设置相对路径或绝对路径
            pattern: "console.yyyy-MM-dd.log",  // 占位符，紧跟在filename后面
            absolute: false,                   // filename是否绝对路径
            alwaysIncludePattern: true,       // 文件名是否始终包含占位符
            layout: {
                type : 'messagePassThrough'
            }
        }
    ],
    replaceConsole: true,
    levels : {
        normal : 'info'
    }
});

module.exports = function(req, res, next){
    var logTpl = 'date ::: method ::: url ::: param';
    var infos = {
        date : new Date(),
        method : req.method,
        url : req.url,
        param : req.method.toLowerCase() === 'get' ? JSON.stringify(req.query) : JSON.stringify(req.body)
    };

    var logger = log4js.getLogger();

    Object.keys(infos).forEach(function(key){
        logTpl = logTpl.replace(key, infos[key]);
    });

    logger.info(logTpl);

    next();
};