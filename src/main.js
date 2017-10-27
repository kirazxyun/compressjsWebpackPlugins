const workerFarm = require('worker-farm')
const workers = workerFarm(require.resolve('./child'))
let ret = 0;
for(let i = 0; i < 10; i++) {
    workers('#' + i + ' FOO', function(err, output) {
        console.log(output)
        if(++ret == 10) {
            workerFarm.end(workers);
        }
    })
}