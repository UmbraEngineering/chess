
var gulp = require('gulp');

gulp.task('fonts', function() {
	return gulp.src('site/fonts/**/*')
		.pipe(gulp.dest('site/build/fonts'));
});
