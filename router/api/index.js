/**
 * Created by xuejian.xu on 2017/8/10.
 */

var router = require('express').Router();

router.get('/csrf', function(req, res, next) {
    var options = {
        maxAge: 2592000000
    };

    res.cookie('username', 'xuxuejian', options);

    res.send('hello world')
});

router.get('/show', function(req, res, next){
    console.log(req.query);

    next()
})

module.exports = router;
