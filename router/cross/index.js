/**
 * @fileOverView: #
 * @author: xuejian.xu
 * @date: 17/3/12.
 */

var router = require('express').Router();

router.post('/', function (req, res, next) {
    console.log(req.body);

    res.json({status: 0, message: 'success'});
});

router.get('/', function (req, res, next) {
    console.log(req.query);

    res.json({status: 0, message: 'success'});
});

module.exports = router;