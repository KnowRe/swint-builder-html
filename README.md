# swint-builder-html

[![Greenkeeper badge](https://badges.greenkeeper.io/Knowre-Dev/swint-builder-html.svg)](https://greenkeeper.io/)
HTML builder for Swint

**Warning: This is not the final draft yet, so do not use this until its official version is launched**

## Installation
```sh
$ npm install --save swint-builder-html
```

## Options
* `inDir` : `String`, default: `path.dirname(require.main.filename)`
* `outDir` : `String`, default: `path.join(path.dirname(require.main.filename), '../out')`
* `minify` : `Boolean`, default: `true`
* `variables` : `Object`, default: `{}`
* `walkOption` : `Object`, default: `{ ext: 'html' }`

## Usage
```javascript
buildHTML({
	inDir: path.join(__dirname, 'elements', 'target'),
	outDir: path.join(__dirname, 'out'),
	variables: {}
}, function() {
	// Build complete
});
```
