
var View  = require('view');

// 
// Define the welcome view
// 
var WelcomeView = module.exports = View.extend({

	template: 'welcome',

	// 
	// Initialize
	// 
	initialize: function() {
		this.elem.classList.add('welcome');
	},

	// 
	// Draws the welcome view
	// 
	draw: function() {
		this.elem.innerHTML = this.render();

		var Board = require('views/board/board');
		var board = new Board();
		board.draw();

		this.elem.appendChild(board.elem);
	}

});
