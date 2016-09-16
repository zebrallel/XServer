/**
 * @fileOverview: Cache
 * @author: xuejian.xu
 * @date: 16/9/10.
 */

var router = require('express').Router();

router.get('/', function(req, res, next){
    res.render('pages/alert', {
        msg : 'Hi, this is page : Cache'
    });
});

router.get('/setCookie', function(req, res, next){
    res.cookie('city', 'guangzhou', {
        maxAge: 2592000000 //a month
    });

    res.render('pages/alert', {
        msg : 'set cookie success, please check your local cookie :)'
    });
});

router.get('/show', function(req, res, next){

    res.render('pages/alert', {
        msg : req.hostname + req.originalUrl
    });
});



module.exports = router;