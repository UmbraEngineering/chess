
var gulp        = require('gulp');
var handlebars  = require('gulp-handlebars');
var declare     = require('gulp-declare');
var concat      = require('gulp-concat');

gulp.task('handlebars', function() {
	gulp.src('site/views/**/*.hbs')
		.pipe(handlebars())
		.pipe(declare({
			namespace: 'app',
			root: 'module.exports',
			noRedeclare: true
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('site/build'));
});
