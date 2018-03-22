/**
 * @fileOverview: 路由入口
 * @author: xuejian.xu
 * @date: 16/7/31.
 */

var router = require('express').Router()
var dirParser = require('../utils/dirParser')
var publicfiles = []
var pages = ['cache', 'wechat', 'cross', 'api', 'ssr']

dirParser('public/{*,*/*}.html', function(files) {
    publicfiles = files.map(function(file) {
        return file.slice(7)
    })
})

router.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    next()
})

router.get('/', function(req, res) {
    res.render('pages/index', {
        publicLinks: publicfiles,
        customLinks: pages
    })
})

const Counter = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('WFT?')
        }, 3000)
    })
}

router.get('/test', async function(req, res){
    console.log('666')
    const re = await Counter()
    console.log(re)
    res.send('Hello')
})

pages.forEach(page => {
    router.use(`/${page}`, require(`./${page}`))
})

module.exports = router
