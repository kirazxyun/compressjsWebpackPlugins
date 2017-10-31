const UglifyJS = require('uglify-es')

module.exports = {
    process() {
        const result = UglifyJS.minify(asset.source())
        if(result.error) {
            throw result.error
        }
        callback(null, result.code)
    }
};
