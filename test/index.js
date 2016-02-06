var os = require('os'),
	fs = require('fs'),
	path = require('path'),
	assert = require('assert'),
	swintHelper = require('swint-helper'),
	buildHTML = require('../lib');

global.swintVar.printLevel = 5;

describe('builder-html', function() {
	it('Error when no callback', function() {
		assert.throws(function() {
			buildHTML({});
		});
	});

	it('Error when inDir doesn\'t exist', function(done) {
		buildHTML({
			inDir: '/this-directory-does-not-exist'
		}, function(err, res) {
			assert.notEqual(err, null);
			done();
		});
	});

	it('Simple case', function(done) {
		buildHTML({
			inDir: path.join(__dirname, '../test_case/target'),
			outDir: path.join(os.tmpdir(), 'swint-builder-html-out'),
			svg: {
				enable: true,
				dir: path.join(__dirname, '../test_case/svg')
			},
			variables: {
				tmplVar: 'A'
			}
		}, function(err, res) {
			assert.deepEqual(
				fs.readFileSync(path.join(__dirname, '../test_result/screen1.html')),
				fs.readFileSync(path.join(os.tmpdir(), 'swint-builder-html-out/screen1.html'))
			);

			assert.deepEqual(
				fs.readFileSync(path.join(__dirname, '../test_result/screen2.html')),
				fs.readFileSync(path.join(os.tmpdir(), 'swint-builder-html-out/screen2.html'))
			);

			done();
		});
	});

	after(function() {
		fs.unlinkSync(path.join(os.tmpdir(), 'swint-builder-html-out/screen1.html'));
		fs.unlinkSync(path.join(os.tmpdir(), 'swint-builder-html-out/screen2.html'));
		fs.rmdirSync(path.join(os.tmpdir(), 'swint-builder-html-out'));
	});
});
