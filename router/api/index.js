/**
 * Created by xuejian.xu on 2017/8/10.
 */

var router = require('express').Router()

router.get('/csrf', function(req, res, next) {
    var options = {
        maxAge: 2592000000
    }

    res.cookie('username', 'xuxuejian', options)

    res.send('hello world')
})

router.get('/show', function(req, res, next) {
    console.log('111')

    res.end('success')
})

router.get('/she', function(req, res) {
    res.json([{ name: 'callie', age: 18 }, { name: 'LittleXu', age: 20 }])
})

router.post('/me', function(req, res) {
    res.json({
        name: 'xxj',
        age: 20
    })
})

module.exports = router
