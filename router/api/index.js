/**
 * Created by xuejian.xu on 2017/8/10.
 */

var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('pages/api');
});

router.get('/todos', function(req, res, next) {
    var todos = [
        {
            content: 'do something',
            completed: false
        },
        {
            content: 'do something 2',
            completed: false
        },
        {
            content: '1111111',
            completed: true
        }
    ]

    res.json(todos);
});

//登陆接口
router.post('/login', function(req, res, next) {
    var options = {
        maxAge: 2592000000
    };

    res.cookie('username', '杨行', options);
    res.cookie('id', '1111111', options);
    res.cookie('type', 1, options);

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
