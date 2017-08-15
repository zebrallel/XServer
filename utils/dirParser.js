/**
 * Created by xuejian.xu on 2017/8/15.
 */

var glob = require('glob');

module.exports = function (pattern, callback) {
    glob(pattern, {}, function (err, files) {
        if(err) {
            console.log(err);
        }else{
            callback(files);
        }
    });
};
