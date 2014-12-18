
var handlebars = require('handlebars');

handlebars.registerHelper('for', function(loop, obj, options) {
	loop = loop.split(' ');

	var key = loop[0].split(':');

	if (key.length === 1) {
		if (loop[1] === 'in') {
			key = [key, null];
		} else if (loop[1] === 'of') {
			key = [null, key];
		}
	}

	return Object.keys(obj)
		.map(loopBlock)
		.join('');

	function loopBlock(key) {
		var scope = { };
		
		if (key[0]) {
			scope[key[0]] = key;
		}
		
		if (key[1]) {
			scope[key[1]] = obj[key];
		}
		
		return options.fn(scope);
	}
})
