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


## License

MIT. Copyright 2014 Rich Harris
