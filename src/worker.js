const tmpFile = require('./tmp-file')
const BOGUS_SOURCEMAP_STRING = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const URL_PREFIX = '//# sourceMappingURL=';
const BOGUS_SOURCEMAP_URL = `\n${URL_PREFIX}${BOGUS_SOURCEMAP_STRING}`;

function minify(source, map, uglifyOptions, uglifier) {
  const opts = Object.assign({}, uglifyOptions)
  if(map) {
    Object.assign(opts, {
      sourceMap: {
        content: map,
        url: BOGUS_SOURCEMAP_STRING
      }
    })
  }

  const result = uglifier.minify(source, opts);
  if(result.error) throw result.error
  result.code = result.code.replace(new RegExp(BOGUS_SOURCEMAP_URL), '')

  return result
}

function processMessage (msgLocation, callback) {
  try {
    const messageContents = tmpFile.read(msgLocation)
    const message = JSON.parse(messageContents)
    const source = message.source
    const map = message.map
    const uglifier = message.options.uglifyES ? require('uglify-es') : require('uglify-js')
    const minifiedContent = minify(source, map, message.options.uglifyJS, uglifier);

    tmpFile.update(msgLocation, JSON.stringify({
      source: minifiedContent.code,
      map: minifiedContent.map
    }))
    callback(null, msgLocation)
  } catch (e) {
    callback(e.message, msgLocation)
  }
}

module.exports = {
  minify,
  processMessage
}