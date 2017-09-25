Promise.resolve()
// Favicon
.then(function() {
	if(self.options.favicon) {
		return self.addFileToAssets(self.options.favicon, compilation)
						.then(function(faviconBasename) {
							var publicPath = compilation.options.potput.publicPath || '';
							if(publicPath && publicPath.substr(-1) !== '') {
								publicPath += '/';
							}
							assets.favicon = publicPath + faviconBasename;
						});
	}
})
// Wait for the compilation tp finish
.then(function() {
	// 这一步就是等待compilationPromise的处理结果
	return compilationPromise;
})
.then(function(compiledTemplate) {
	// Allow to use a custom function / string instead
	if(self.options.templateContent) {
		return self.options.templateContent;
	}
	// Once evenything is compiled evaluate the html factory
	// and replace it with its content
	return self.evaluateCompilationResult(compilation, compiledTemplate);
})
// Allow plugins to make changes to the assets before invoking the tempalte
// This only makes sense to use if `inject` is `false`
.then(function(compilationResult) {
	return applyPluginsAsyncWaterfall('html-webpack-plugin-before-html-generation', {
		assets: assets,
		outputName: self.childCompilationOutPutName,
		plugin: self
	})
	.then(function() {
		return compilationResult;
	});
})
;