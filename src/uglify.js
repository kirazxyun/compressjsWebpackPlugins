const UglifyJS = require('uglify-es')

module.exports = function(asset, callback) {
    const result = UglifyJS.minify(asset.source())
    if(result.error) {
        throw result.error
    }
    callback(null, result.code)
};
