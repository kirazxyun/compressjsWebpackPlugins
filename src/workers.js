const workerFarm = require('worker-farm')
const pify = require('pify')

// 建立多线程workers

module.exports = {
    process () {
        const assets = compilation.assets
        const workers = workerFarm(require.resolve('./uglify'), ['process'])
        const uglify = pify(workers.process)
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
} 