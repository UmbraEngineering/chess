
var gulp         = require('gulp');
var runSequence  = require('run-sequence');

gulp.task('build', ['lint'], function(cb){
	runSequence(
		'clean',
		'handlebars',
		['fonts', 'css', 'browserify'],
		cb);
});
