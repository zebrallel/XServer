/**
 * @fileOverview: 路由入口
 * @author: xuejian.xu
 * @date: 16/7/31.
 */

var router = require('express').Router();
var dirParser = require('../utils/dirParser');
var publicfiles = [];

dirParser('public/{*,*/*}.html', function(files){
    publicfiles = files.map(function(file){
        return file.slice(7);
    });
});

router.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

router.get('/', function(req, res) {
    var pages = ['cache', 'wechat', 'cross', 'api'];

    res.render('pages/index', {
        publicLinks : publicfiles,
        customLinks : pages
    });
});

router.use('/cache', require('./cache'));
router.use('/wechat', require('./wechat'));
router.use('/cross', require('./cross'));
router.use('/api', require('./api'));

module.exports = router;
