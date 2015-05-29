var path = require( 'path' );
var sander = require( 'sander' );
var assert = require( 'assert' );
var transformer = require( '../' );

describe( 'gobble-replace', function () {
	it( 'replaces text', function () {
		var transformed = transformer( 'should be <@replaced@>', {
			replaced: 'not the same'
		});

		assert.equal( transformed, 'should be not the same' );
	});

	it( 'allows custom delimiters', function () {
		var transformed = transformer( 'should be [[replaced]]', {
			replaced: 'not the same',
			delimiters: [ '[[', ']]' ]
		});

		assert.equal( transformed, 'should be not the same' );
	});

	it( 'replaces nested properties', function () {
		var transformed = transformer( 'should be <@replaced.by.nested.value@>', {
			replaced: { by: { nested: { value: 'different' } } }
		});

		assert.equal( transformed, 'should be different' );
	});

	// TODO test sourcemaps etc
});
