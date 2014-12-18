
var Class       = require('class');
var handlebars  = require('handlebars/dist/handlebars.runtime');
var templates   = require('build/templates');

// 
// Define the view class
// 
var View = module.exports = Class.extend({

	init: function() {
		this.elem = document.createElement('section');

		if (this.initialize) {
			this.initialize();
		}
	},

	render: function(template, data) {
		if (typeof template !== 'string') {
			data = template;
			template = 'template';
		}

		if (typeof this[template] === 'string') {
			this[template] = templates.app[this[template]];
		}

		if (typeof this[template] === 'object' && this[template].main) {
			this[template] = handlebars.template(this[template]);
		}

		return this[template](data);
	}

});
