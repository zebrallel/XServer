/**
 * @fileOverView: log4j
 * @author: xuejian.xu
 * @date: 17/2/16.
 */

var router = require('express').Router();
var log4js = require('log4js');
var schedule = require('@qnpm/q-schedule');

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
            pattern: "console.yyyy-MM-dd hh:mm.log",  // 占位符，紧跟在filename后面
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

var logger = log4js.getLogger();

var j = schedule.scheduleJob('01 * * * * *', function () {
    logger.info(new Date().toLocaleString());
});

router.get('*', function (req, res, next) {
    logger.info("Time:", new Date());

    res.render('pages/alert', {
        msg : 'Now you are suppose to get a log from console'
    });
});

module.exports = router;