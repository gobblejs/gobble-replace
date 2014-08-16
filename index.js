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
