
var pieceFont = 'chessicons';
var ranks = [8, 7, 6, 5, 4, 3, 2, 1];
var files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

var Board = module.exports = function() {
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
							piece.src = '/assets/pieces/' + pieceFont + '/br.svg';
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
};
