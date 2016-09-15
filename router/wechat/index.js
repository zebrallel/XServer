var router = require('express').Router();
var md5 = require('md5');
var Mustache = require('mustache');

var appID = 'wxab7a2f57b56ee245';
var appsecret = '12a9a7f898d7ab5ddf7294d3b5f1868c';

var queryCodeURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid={{appId}}&redirect_uri={{backUrl}}&response_type=code&scope={{scope}}&state={{state}}#wechat_redirect';

router.get('/', function(req, res, next){
    res.render('pages/wechat', {

    });
});

router.get('/auth', function(req, res, next){
    var isWx = isWechat(req);

    if(isWx){
        var backUrl = encodeURIComponent('http://test.qunar.com/wechat'),
            scope = 'snsapi_userinfo',
            state = md5('test.qunar.com');

        res.redirect(Mustache.render(queryCodeURL, {
            appId : appID,
            backUrl : backUrl,
            scope : scope,
            state : state
        }));
    }else{
        res.send('Sorry, please open this page in Wechat!');
    }
});

function isWechat(req){
    return /micromessenge/.test(req.get('User-Agent').toLowerCase());
}

module.exports = router;