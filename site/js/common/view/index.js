
var Class = require('class');

// 
// Define the view class
// 
var View = module.exports = Class.extend({

	init: function() {
		// 
	},

	draw: function() {
		this.elem = document.createElement('section');

		if (typeof this.render === 'function') {
			this.render();
		}

		return this.elem;
	}

});
