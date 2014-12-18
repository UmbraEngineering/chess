
var gulp    = require('gulp');
var myth    = require('gulp-myth');
var cssmin  = require('gulp-cssmin');
var concat  = require('gulp-concat');

gulp.task('css', function() {
	return gulp.src(['site/css/reset.css', 'site/css/base.css', 'site/fonts/**/*.css', 'site/css/app/**/*.css'])
		.pipe(myth())
		.pipe(concat('app.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('site/build/css'));
});
