
var View  = require('view');

var pieceFont = 'chessicons';
var ranks = '87654321';
var files = 'abcdefgh';

var BoardView = module.exports = View.extend({

	template: 'board',

	// 
	// Initialize
	// 
	initialize: function() {
		this.elem.classList.add('board');
	},

	// 
	// Draw
	// 
	draw: function() {
		this.elem.innerHTML = this.render({
			ranks: ranks.split(''),
			files: files.split('')
		});

		// Draw pieces to the board
		
		this.drawPiece('a8', 'b', 'r');
		this.drawPiece('b8', 'b', 'n');
		this.drawPiece('c8', 'b', 'b');
		this.drawPiece('d8', 'b', 'q');
		this.drawPiece('e8', 'b', 'k');
		this.drawPiece('f8', 'b', 'b');
		this.drawPiece('g8', 'b', 'n');
		this.drawPiece('h8', 'b', 'r');
		
		this.drawPiece('a7', 'b', 'p');
		this.drawPiece('b7', 'b', 'p');
		this.drawPiece('c7', 'b', 'p');
		this.drawPiece('d7', 'b', 'p');
		this.drawPiece('e7', 'b', 'p');
		this.drawPiece('f7', 'b', 'p');
		this.drawPiece('g7', 'b', 'p');
		this.drawPiece('h7', 'b', 'p');
		
		this.drawPiece('a1', 'w', 'r');
		this.drawPiece('b1', 'w', 'n');
		this.drawPiece('c1', 'w', 'b');
		this.drawPiece('d1', 'w', 'q');
		this.drawPiece('e1', 'w', 'k');
		this.drawPiece('f1', 'w', 'b');
		this.drawPiece('g1', 'w', 'n');
		this.drawPiece('h1', 'w', 'r');
		
		this.drawPiece('a2', 'w', 'p');
		this.drawPiece('b2', 'w', 'p');
		this.drawPiece('c2', 'w', 'p');
		this.drawPiece('d2', 'w', 'p');
		this.drawPiece('e2', 'w', 'p');
		this.drawPiece('f2', 'w', 'p');
		this.drawPiece('g2', 'w', 'p');
		this.drawPiece('h2', 'w', 'p');
	},

	// 
	// 
	// 
	drawPiece: function(square, color, piece) {
		var img = document.createElement('img');

		img.src = '/assets/pieces/' + pieceFont + '/' + color + piece + '.svg';

		this.findSquare(square)
			.appendChild(img);
	},

	// 
	// 
	// 
	findSquare: function(square) {
		return this.elem.querySelector('td[data-square="' + square + '"]');
	}

});





/*var Board = module.exports = function() {
	// 
};

Board.prototype.draw = function() {
	var main = document.querySelector('main');
	var table = main.appendChild(document.createElement('table'));
	table.className = 'board';

	ranks.forEach(function(rank) {
		var row = table.appendChild(document.createElement('tr'));
		row.setAttribute('data-rank', rank);

		files.forEach(function(file) {
			var cell = row.appendChild(document.createElement('td'));
			cell.setAttribute('data-file', file);

			var piece = document.createElement('img');

			switch (rank) {
				case 8:
					switch (file) {
						case 'a':
						case 'h':
							piece.src = ;
						break;
						case 'b':
						case 'g':
							piece.src = '/assets/pieces/' + pieceFont + '/bn.svg';
						break;
						case 'c':
						case 'f':
							piece.src = '/assets/pieces/' + pieceFont + '/bb.svg';
						break;
						case 'd':
							piece.src = '/assets/pieces/' + pieceFont + '/bq.svg';
						break;
						case 'e':
							piece.src = '/assets/pieces/' + pieceFont + '/bk.svg';
						break;
					}
				break;
				case 7:
					piece.src = '/assets/pieces/' + pieceFont + '/bp.svg';
				break;
				case 2:
					piece.src = '/assets/pieces/' + pieceFont + '/wp.svg';
				break;
				case 1:
					switch (file) {
						case 'a':
						case 'h':
							piece.src = '/assets/pieces/' + pieceFont + '/wr.svg';
						break;
						case 'b':
						case 'g':
							piece.src = '/assets/pieces/' + pieceFont + '/wn.svg';
						break;
						case 'c':
						case 'f':
							piece.src = '/assets/pieces/' + pieceFont + '/wb.svg';
						break;
						case 'd':
							piece.src = '/assets/pieces/' + pieceFont + '/wq.svg';
						break;
						case 'e':
							piece.src = '/assets/pieces/' + pieceFont + '/wk.svg';
						break;
					}
				break;
			}

			cell.appendChild(piece.src ? piece : document.createTextNode(' '));
		});
	});
};*/
