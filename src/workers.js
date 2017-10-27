const workerFarm = require('worker-farm')
const pify = require('pify')

// 建立多线程workers

module.exports = function (compilation) {
    const assets = compilation.assets
    const workers = workerFarm(require.resolve('./uglify'))
    const uglify = pify(workers)
    assets = assets.filter(function(key) {
        return /.*\.js$/.test(key)
    });
    const promiseArr = assets.map((key) => {
        return uglify(assets[key]).then((content) => {
            assets[key] = new RawSource(content)
        });
    });
    return Promise.all(promiseArr).then(()=>{
        workers.end()
    }, () => {
        workers.end()
    }).catch(() => {
        workers.end()
    });
} 