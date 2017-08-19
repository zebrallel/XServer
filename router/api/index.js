/**
 * Created by xuejian.xu on 2017/8/10.
 */

var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('pages/api');
});

router.get('/get/:id', function(req, res, next) {
    var person = {};

    if (req.params.id === '100') {
        person = {
            name: 'callie',
            age: 26,
            sex: 'female'
        };
    } else {
        person = {
            name: 'xxj',
            age: 25,
            sex: 'male'
        };
    }

    res.json(person);
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

//审核列表接口
router.post('/account/authList', function(req, res, next){
    res.json({
        "message": "返回列表成功",
        "status": "0",
        "data":
            [
                {
                    "auth_time": "2017-08-11 16:17:01",
                    "create_time": "2017-08-11 16:17:00",
                    "user_nickname": "xuxuejian",
                    "user_id": 2,
                    "type": 0
                },
                {
                    "auth_time": "2017-08-11 16:56:18",
                    "create_time": "2017-08-11 16:38:24",
                    "user_nickname": "123456",
                    "user_id": 3,
                    "type": 0
                },
                {
                    "auth_time": null,
                    "create_time": "2017-08-11 17:03:47",
                    "user_nickname": "1234567",
                    "user_id": 4,
                    "type": 0
                }
            ]
    });
});

//审核接口
router.post('/account/auth', function(req, res){
    res.json({
        "message": "审核成功",
        "status": "0",
        "data": null
    });
});

//首页接口
router.post('/account/home', function(req, res){
    res.json({
        status : 0,
        data : {
            history : [
                {
                    name : '工业机器人编程',
                    location : 'demo.html'
                },
                {
                    name : '工业机器人编程2',
                    location : 'demo.html'
                }
            ],
            hotCourses : [
                {
                    name : '工业机器人编程',
                    location : 'demo.html'
                },
                {
                    name : '工业机器人编程2',
                    location : 'demo.html'
                }
            ],
            hotResources : [
                {
                    name : '工业机器人编程',
                    location : 'demo.html'
                },
                {
                    name : '工业机器人编程2',
                    location : 'demo.html'
                }
            ]
        }
    });
});

router.post('/account/getFavoriteList', function(req, res){
    res.json({
        status : 0,
        data : [
            {
                "user_id": 1,
                "name": "home",
                "location": "demo.html",
                "id": 1,
                "time": "2017-08-19 12:03:35",
                "image" : 'http://odl96infd.bkt.clouddn.com/machine2machine.png',
                description : '机器人操作巴拉巴拉巴拉巴拉',
                "type": 1
            },
            {
                "user_id": 1,
                "name": "login",
                "location": "demo.html",
                "id": 2,
                "time": "2017-08-19 12:07:54",
                "image" : 'http://odl96infd.bkt.clouddn.com/machine2machine.png',
                description : '机器人操作巴拉巴拉巴拉巴拉',
                "type": 1
            },
            {
                "user_id": 1,
                "name": "login1",
                "location": "demo.html",
                "id": 3,
                "image" : 'http://odl96infd.bkt.clouddn.com/machine2machine.png',
                description : '机器人操作巴拉巴拉巴拉巴拉',
                "time": "2017-08-19 12:08:39",
                "type": 1
            }
        ]
    })
});

module.exports = router;
