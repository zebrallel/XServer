/**
 * Created by xuejian.xu on 2017/8/10.
 */

var router = require('express').Router()
const { generateHash } = require('../../utils/index')
const apis = []

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

router.post('/addapi', function(req, res) {
    const data = req.body
    const hash = generateHash(Date.now().toString(), 5)

    apis.push({ ...data, id: hash })

    res.json({
        code: 200,
        data: {
            id: hash
        },
        message: 'success'
    })
})

router.get('/getapi', function(req, res) {
    res.json({
        code: 200,
        data: apis,
        message: 'success'
    })
})

module.exports = router
