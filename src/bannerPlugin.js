var BannerPlugin = function(options) {};

BannerPlugin.prototype.apply = function(compiler, callback) {
	compiler.plugin('compilation', function(compilation) {
		compilation.plugin('optimize-chunk-assets', function(chunks, callback) {
			chunks.forEach(function(chunk) {
				chunks.files.forEach(function(file) {
					compilation.assets[file] = new ConcatSource('\/**Sweet Banner**\/', '\n', compilation.assets[file]);
				});
			});
			callback();
		});
	});
};