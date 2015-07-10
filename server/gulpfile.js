const gulp = require('gulp');
const jshint = require('gulp-jshint');
const watch = require('gulp-watch');
const stylish = require('jshint-stylish');
const notify = require('gulp-notify');

const jsFiles = ['./models/**/*.js', './routes/**/*.js', './app.js'];

gulp.task('jshint', function() {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(notify(function(file) {
			return file.jshint.success ? false : 'JSHint failed';
		}));
});

gulp.task('watch', function() {
	gulp.watch(jsFiles, ['jshint']);
});

gulp.task('default', ['jshint']);