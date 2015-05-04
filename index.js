var MagicString = require( 'magic-string' );

module.exports = replace;

function replace ( text, options ) {
	var delimiters = options.delimiters ? options.delimiters.map( escapeSpecials ) : [ '<@', '@>' ];
	var pattern = new RegExp( delimiters[0] + '\\s*([^\\s]+)\\s*' + delimiters[1], 'g' );
	var replacements = options.replacements || options;

	var magicString = new MagicString( text );

	var match;
	while ( match = pattern.exec( text ) ) {
		if ( replacements.hasOwnProperty( match[1] ) ) {
			magicString.replace( match.index, match.index + match[0].length, replacements[ match[1] ] );
		}
	}

	return {
		code: magicString.toString(),
		map: magicString.generateMap({ hires: true })
	};
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
