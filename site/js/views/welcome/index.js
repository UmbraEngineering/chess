
var View = require('common/view');

// 
// Define the welcome view
// 
var WelcomeView = module.exports = View.extend({

	// 
	// Draws the welcome view
	// 
	render: function() {
		this.elem.className = 'welcome';

		this.elem.innerHTML =
			'<h2>Welcome!</h2>';
	}

});
