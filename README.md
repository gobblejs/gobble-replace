# gobble-replace

Replace ${variables} in text with gobble.

## Installation

First, you need to have gobble installed - see the [gobble readme](https://github.com/gobblejs/gobble) for details. Then,

```bash
npm i -D gobble-replace
```

## Usage

**gobblefile.js**

```js
var gobble = require( 'gobble' );
module.exports = gobble( 'templates' ).map( 'replace', { foo: 'bar', answer: 42 });
```

You can use custom delimiters if you prefer:

```js
var gobble = require( 'gobble' );
module.exports = gobble( 'templates' ).map( 'replace', {
  foo: 'bar',
  answer: 42,
  delimiters: [ '<%=', '%>' ]
});
```

Or, if you want to be really anal about keeping options and variables separate...

```js
var gobble = require( 'gobble' );
module.exports = gobble( 'templates' ).map( 'replace', {
  replacements: { foo: 'bar', answer: 42 },
  delimiters: [ '<%=', '%>' ]
});
```

## Source code

```js
module.exports = replace;

function replace ( text, options ) {
	var delimiters, pattern, replacements;

	delimiters = options.delimiters ? options.delimiters.map( escapeSpecials ) : [ '\\$\\{', '\\}' ];
	pattern = new RegExp( delimiters[0] + '\\s*([a-zA-Z_$0-9]+)\\s*' + delimiters[1], 'g' );

	replacements = options.replacements || options;

	return text.replace( pattern, function ( match, $1 ) {
		return replacements[ $1 ] || match;
	});
}

replace.defaults = {
	// we only want to use this function with text files - not binaries (images etc)
	accept: 'html svg txt md hbs json cson xml yml js coffee ts css scss sass'.split( ' ' ).map( function ( ext ) { return '.' + ext; })
};

function escapeSpecials ( str ) {
	return str.replace( /\\/g, '//' ).replace( /[\.\+\*\?\[\^\]\$\(\)\{\}\!\|\:\-]/g, function ( match ) {
		return '\\' + match;
	});
}
```


## License

MIT. Copyright 2014 Rich Harris
