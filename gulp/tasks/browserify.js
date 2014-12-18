
var gulp        = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var es3ify      = require('gulp-es3ify');
var streamify   = require('gulp-streamify');

gulp.task('browserify', function() {
	return browserify({
		paths: ['./site/js/lib', './site/js/common', './site/vendor', './site/js'],
		entries: ['./site/js/main.js']
	})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(streamify(es3ify()))
		.pipe(gulp.dest('site/build/js'));
});
