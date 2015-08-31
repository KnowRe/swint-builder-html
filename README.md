# swint-builder-html
HTML builder for Swint

**Warning: This is not the final draft yet, so do not use this until its official version is launched**

## Installation
```sh
$ npm install --save swint-builder-html
```

## Options
* `name` : `String`, default: `Project`
* `inDir` : `String`, default: `path.dirname(require.main.filename)`
* `outDir` : `String`, default: `path.join(path.dirname(require.main.filename), '../out')`
* `minify` : `Boolean`, default: `true`
* `variables` : `Object`, default: `{}`
* `walkOption` : `Object`, default: `{ ext: 'html' }`

## Usage
```javascript
buildHTML({
	name: 'Test',
	inDir: path.join(__dirname, 'elements', 'target'),
	outDir: path.join(__dirname, 'out'),
	variables: {}
}, function() {
	// Build complete
});
```
