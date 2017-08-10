/**
 * Created by xuejian.xu on 2017/8/10.
 */

var router = require('express').Router();

router.get('/', function(req, res){
    res.render('pages/axios');
});

router.get('/get/:id', function(req, res, next){
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

router.post('/login', function(req, res, next){
    res.cookie('token', 'abcdefg', {
        maxAge: 2592000000,
        domain: '.qunar.com'
    });

    res.json({name: 'callie'});
});

module.exports = router;
