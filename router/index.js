/**
 * @fileOverview: 路由入口
 * @author: xuejian.xu
 * @date: 16/7/31.
 */

var router = require('express').Router();

router.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

router.get('/', function(req, res) {
    var pages = ['cache', 'wechat', 'cross', 'api'];

    res.render('pages/index', {
        pages: pages,
        first: pages[0]
    });
});

router.use('/cache', require('./cache'));
router.use('/wechat', require('./wechat'));
router.use('/cross', require('./cross'));
router.use('/api', require('./api'));

module.exports = router;
