/**
 * @fileOverview: Cache
 * @author: xuejian.xu
 * @date: 16/9/10.
 */

var router = require('express').Router();

router.all('/', function(req, res, next){
    res.send('this is cache!');
});

module.exports = router;