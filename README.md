# gobble-replace

Replace <@variables@> in text with gobble.

## Installation

First, you need to have gobble installed - see the [gobble readme](https://github.com/gobblejs/gobble) for details. Then,

```bash
npm i -D gobble-replace
```

## Usage

**gobblefile.js**

```js
var gobble = require( 'gobble' );
module.exports = gobble( 'templates' ).map( 'replace', {
  // all instances of `<@foo@>` and `<@answer@>` in the
  // files in `templates` will be replaced
  foo: 'bar',
  answer: 42,

  // supply custom delimiters
  delimiters: [ '<%=', '%>' ]

  // generate a sourcemap
  sourceMap: true
});
```

Or, if you want to be really anal about keeping options and variables separate...

```js
var gobble = require( 'gobble' );
module.exports = gobble( 'templates' ).map( 'replace', {
  replacements: { foo: 'bar', answer: 42 },
  delimiters: [ '<%=', '%>' ],
  sourceMap: true
});
```


## License

MIT. Copyright 2014-15 Rich Harris
