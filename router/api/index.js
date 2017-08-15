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

router.post('/login', function(req, res, next) {
    var data = {
        status: 0,
        data: {
            token: 'abc'
        }
    };

    res.json(data);
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

module.exports = router;
