var PrintChunkPlugin = function() {};

PrintChunkPlugin.prototype.apply = function(compilar) {
	compilar.plugin('compilation', function(compilation) {
		compilation.plugin('after-optimize-chunk-asserts', function(chunks) {
			console.log(chunks.map(function(chunk) {
				return {
					id: chunk.id,
					name: chunk.name,
					includes: chunk.modules.map(function(module) {
						return module.request;
					})
				};
			}));
		});
	});
};