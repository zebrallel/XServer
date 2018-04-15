/**
 * Created by xuejian.xu on 2017/8/10.
 */

var router = require('express').Router();

router.post('/csrf', function(req, res, next) {
    var options = {
        maxAge: 2592000000
    };

    res.cookie('username', 'xuxuejian', options);

    res.json({
        status : 0,
        data : null
    });
});

//注册接口
router.post('/account/register', function(req, res){
    res.json({
        status : 0,
        data : null
    })
});

router.post('/account/favorite', function(req, res){
    res.json({
        status : 0,
        message : ''
    })
});

module.exports = router;
