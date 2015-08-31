'use strict';

var path = require('path'),
	fs = require('fs'),
	ejs = require('ejs'),
	swintHelper = require('swint-helper'),
	defaultize = swintHelper.defaultize,
	walk = swintHelper.walk,
	minify = require('html-minifier').minify;

module.exports = function(options, callback) {
	defaultize({
		name: 'Project',
		inDir: path.dirname(require.main.filename),
		outDir: path.join(path.dirname(require.main.filename), '../out'),
		minify: true,
		variables: {},
		scriptAttribute: [],
		walkOption: {
			ext: 'html'
		}
	}, options);

	return proceed(options, callback);
};

var proceed = function(options, callback) {
	if(callback === undefined) {
		var msg = 'swint-builder-polymer function needs callback';
		print(4, msg);
		throw new Error(msg);
	}

	if(!fs.existsSync(options.inDir)) {
		callback('swint-builder-polymer: inDir doesn\'t exist', false);
		return;
	}

	if(!fs.existsSync(options.outDir)) {
		fs.mkdirSync(options.outDir);
	}

	var walkOption = options.walkOption;
	walkOption.dir = options.inDir;

	var walkList = walk(walkOption);

	walkList.forEach(function(v) {
		var html = fs.readFileSync(v, 'utf8'),
			variables = JSON.parse(JSON.stringify(options.variables));

		variables.filename = v;

		var output = ejs.render(
				html,
				variables
			),
			outFile = path.join(options.outDir, path.basename(v));

		if(options.minify) {
			output = minify(output, {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeRedundantAttributes: true,
				removeEmptyAttributes: true,
				processScripts: options.scriptAttribute
			});
		}

		fs.writeFileSync(outFile, output);
	});

	if(callback !== undefined) {
		callback(null, true);
	}
};
