const pify = require('pify');

function fn(data, callback) {
    setTimeout(function() {
        callback(null, data);
    });
}

const promiseFn = pify(fn);

	promiseFn('hh').then(data => {
		console.log(data);
	});