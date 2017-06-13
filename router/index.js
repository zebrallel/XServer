/**
 * @fileOverview: 路由入口
 * @author: xuejian.xu
 * @date: 16/7/31.
 */

var router = require('express').Router();

router.use('/cache', require('./cache'));
router.use('/wechat', require('./wechat'));
router.use('/cross', require('./cross'));

module.exports = router;