var extname = require( 'path' ).extname;
var MagicString = require( 'magic-string' );

module.exports = replace;

var NO_MATCH = {};
var hasProp = {}.hasOwnProperty;

function getValue ( obj, keypath ) {
	var keys = keypath.split( '.' );

	do {
		key = keys.shift();
		if ( !hasProp.call( obj, key ) ) {
			return NO_MATCH;
		}

		obj = obj[ key ];
	} while ( keys.length );

	return obj;
}

function escapeSpecials ( str ) {
	return str.replace( /\\/g, '//' ).replace( /[\.\+\*\?\[\^\]\$\(\)\{\}\!\|\:\-]/g, function ( match ) {
		return '\\' + match;
	});
}

function replace ( text, options ) {
	var delimiters = options.delimiters ? options.delimiters.map( escapeSpecials ) : [ '<@', '@>' ];
	var pattern = new RegExp( delimiters[0] + '\\s*([^\\s]+?)\\s*' + delimiters[1], 'g' );
	var replacements = options.replacements || options;

	var ext = extname( this.src );
	var sourceMap = 'sourceMap' in options ? options.sourceMap : ( ext === '.js' || ext === '.css' );

	if ( sourceMap ) {
		var magicString = new MagicString( text );

		var match;
		while ( match = pattern.exec( text ) ) {
			value = getValue( replacements, match[1] );
			if ( value && value !== NO_MATCH ) {
				magicString.replace( match.index, match.index + match[0].length, value );
			}
		}

		return {
			code: magicString.toString(),
			map: magicString.generateMap({ hires: true })
		};
	}

	else {
		return text.replace( pattern, function ( match, $1 ) {
			var value = getValue( replacements, $1 );
			return value !== NO_MATCH ? value : match;
		});
	}
}

replace.defaults = {
	// we only want to use this function with text files - not binaries (images etc)
	accept: 'html svg txt md hbs json cson xml yml js coffee ts css scss sass'.split( ' ' ).map( function ( ext ) { return '.' + ext; })
};
