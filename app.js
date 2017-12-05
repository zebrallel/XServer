/**
 * @fileOverview: A simple http server
 * @author: xuejian.xu
 * @date: 16/7/30.
 */

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routers = require('./router');
const app = express();
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const layouts = require('handlebars-layouts');
const _ = require('lodash');
const logger = require('./modules/logger');

//Setting
app.set('port', process.env.PORT || 9999);

//Set view engine
handlebars.registerHelper(layouts(handlebars));

var hbs = exphbs.create({
    handlebars : handlebars,
    extname : '.hbs',
    partialsDir : [
        'views/partials',
        'views/layouts'
    ]
});

hbs.getPartials().then(function(partials){
    _.forOwn(partials, function(value, key){
        handlebars.registerPartial(key, value);
    });
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public'), {
    index : false
}));
app.use(logger); // 记录日志

// 禁止浏览器缓存
app.use(function (req, res, next) {
     res.setHeader('Cache-Control', 'no-store');
     res.setHeader('Expires', '0');
     res.setHeader("Pragma", "no-cache");
    next();
});

//Routes
app.use('/', routers);

// 未命中任何一个路由规则。404页面或json。
app.all('*', function (req, res) {
    switch (req.method.toLowerCase()) {
        case 'post':
            return res.json({status: -1, msg: '404', message : '系统繁忙，请稍后再试!'});
        case 'get':
            return res.render('pages/404');
    }
});

const server = app.listen(app.get('port'), '127.0.0.1', function(){
    const host = server.address().address;
    const port = server.address().port;

    console.log('XServer now listening at http://%s:%s', host, port);
});
