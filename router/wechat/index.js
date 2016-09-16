var router = require('express').Router();
var md5 = require('md5');
var Mustache = require('mustache');
var request = require('request');
var _ = require('lodash');
var qs = require('querystring');

var appID = 'wxab7a2f57b56ee245';
var appsecret = '12a9a7f898d7ab5ddf7294d3b5f1868c';
var cookieArr = [
    'access_token',
    'refresh_token',
    'openid'
];

var queryCodeURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid={{appId}}&redirect_uri={{backUrl}}&response_type=code&scope={{scope}}&state={{state}}#wechat_redirect';
var queryAccessTokenURL = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid={{appId}}&secret={{appsecret}}&code={{code}}&grant_type=authorization_code';
var queryUserInfoURL = 'https://api.weixin.qq.com/sns/userinfo?access_token={{accessToken}}&openid={{openId}}&lang=zh_CN';
var checkAccessTokenURL = 'https://api.weixin.qq.com/sns/auth?access_token={{accessToken}}&openid={{openId}}';
var queryAccessToeknByFreshTokenURL = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid={{appId}}&grant_type=refresh_token&refresh_token={{refreshToken}}';

router.get('/', function(req, res, next){
    var isWx = isWechat(req);

    if(isWx){
        var storage = _.pick(req.cookies, cookieArr);

        if(storage.access_token){
            authenticateAccessToken(storage)
            .then(function(){
                return queryUserInfo(storage);
            }).catch(function(err){
                console.log(err);

                queryAccessTokenByRefreshToken(req, res, storage);
            }).then(function(data){
                res.render('pages/wechat', {
                    iconUrl : data.headimgurl,
                    nickname : data.nickname
                });
            }).catch(function(err){
                console.log(err);
            });
        }else{
            if(req.query.code){
                request.get(Mustache.render(queryAccessTokenURL, {
                    appId : appID,
                    appsecret : appsecret,
                    code : req.query.code
                }), function(err, resp, data){
                    data = JSON.parse(data);

                    if(data.errcode){
                        console.log(data.errmsg);
                    }else{
                        console.log('query code success!');
                        console.log(JSON.stringify(data, null, 4));

                        refreshCookies(res, _.pick(data, cookieArr));

                        var queryObj = _.omit(req.query, ['code', 'state']);
                        var queryStr = qs.stringify(queryObj);

                        res.redirect(req.baseUrl + req.path + '?' + queryStr);
                    }
                })
            }else{
                res.redirect(Mustache.render(queryCodeURL, {
                    appId : appID,
                    backUrl : encodeURIComponent(req.protocol + '://' + req.hostname + req.originalUrl),
                    scope : 'snsapi_userinfo',
                    state : md5(new Date())
                }));
            }
        }
    }else{
        res.render('pages/alert', {
            msg : 'Sorry, please open this page in Wechat : )'
        });
    }
});

/**
 * access_token authentication
 * @param storage
 * @returns {Promise|any|Promise<T>}
 */
function authenticateAccessToken(storage){
    return new Promise(function(resolve, reject){
        request.get(Mustache.render(checkAccessTokenURL, {
            accessToken : storage.access_token,
            openId : storage.openid
        }), function(err, resp, data){
            data = JSON.parse(data);

            console.log('authentication access_token result :');
            console.log(JSON.stringify(data, null, 4));

            data.errcode === 0 ? resolve() : reject(data.errmsg);
        })
    });
}

/**
 * query user info
 * @param storage
 * @returns {Promise|any|Promise<T>}
 */
function queryUserInfo(storage){
    return new Promise(function(resolve, reject){
        request.get(Mustache.render(queryUserInfoURL, {
            accessToken : storage.access_token,
            openId : storage.openid
        }), function(err, resp, data){
            data = JSON.parse(data);

            if(data.errcode){
                reject(data.errmsg);
            }else{
                console.log('query userinfo success!');
                console.log(JSON.stringify(data, null, 4));

                resolve(data);
            }
        })
    });
}

/**
 * query access_token by refresh_token
 * @param req
 * @param res
 * @param storage
 */
function queryAccessTokenByRefreshToken(req, res, storage){
    request.get(Mustache.render(queryAccessToeknByFreshTokenURL, {
        appId : appID,
        openId : storage.openid
    }), function(err, resp, data){
        data = JSON.parse(data);

        if(data.errcode){
            console.log(data.errmsg);
        }else{
            console.log('query access_token by refresh_token success!');
            console.log(JSON.stringify(data, null, 4));

            refreshCookies(res, _.pick(data, cookieArr));

            res.redirect(req.originalUrl);
        }
    });
}

/**
 * refresh the auth info stored in cookies
 * @param res
 * @param map
 */
function refreshCookies(res, map){
    _.forOwn(map, function(value, key){
        res.cookie(key, value, {
            maxAge: 2592000000 //a month
        });
    });

    console.log('cookie refreshed!');
    console.log(JSON.stringify(map, null, 4));
}

function isWechat(req){
    return /micromessenge/.test(req.get('User-Agent').toLowerCase());
}

module.exports = router;