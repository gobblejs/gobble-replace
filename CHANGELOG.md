# changelog

## 0.3.1

* Allow replacement values to be the empty string, when generating sourcemaps

## 0.3.0

* Replaces nested properties (e.g. `<@foo.bar.baz@>`)

## 0.2.2

* Generate sourcemaps by default if source is `.js` or `.css`
* Make tag detector regex non-greedy

## 0.2.1

* Make sourcemaps optional, with `sourceMap: true`

## 0.2.0

* Change default delimiters to `<@...@>` instead of `${...}`, to reduce confusion with ES6 template strings
* Sourcemap support

## 0.1.0

* First release
