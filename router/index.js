/**
 * @fileOverview: 路由入口
 * @author: xuejian.xu
 * @date: 16/7/31.
 */

var router = require('express').Router();
var cacheRouter = require('./cache');
var wechatRouter = require('./wechat');

router.use('/cache', cacheRouter);
router.use('/wechat', wechatRouter);

module.exports = router;