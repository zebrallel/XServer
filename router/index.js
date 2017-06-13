/**
 * @fileOverview: 路由入口
 * @author: xuejian.xu
 * @date: 16/7/31.
 */

var router = require('express').Router();

router.all('*', function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');

    next();
});

router.get('/', function(req, res){
    var pages = [
        'cache',
        'wechat',
        'cross'
    ];

    res.render('pages/index', {
        pages : pages,
        first : pages[0]
    });
});

router.use('/cache', require('./cache'));
router.use('/wechat', require('./wechat'));
router.use('/cross', require('./cross'));

// simple routes
router.get('/axios/get/:id', function(req, res, next){
    var person = {};

    if(req.params.id === '100'){
        person = {
            name : 'callie',
            age : 26,
            sex : 'female'
        }
    }else{
        person = {
            name : 'xxj',
            age : 25,
            sex : 'male'
        }
    }

    res.json(person);
});

module.exports = router;