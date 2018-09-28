var gulp = require('gulp'),
uglify = require('gulp-uglify'),
sass = require('gulp-sass'),
rename = require('gulp-rename'),
cssmin = require('gulp-clean-css'),
htmlmin = require('gulp-htmlmin'),
inject = require('gulp-inject'),
concat = require('gulp-concat'),
base64 = require('gulp-base64'),
connect = require('gulp-connect');

gulp.task('scss',function(){
	gulp.src(['src/sass/main.scss'])
		.pipe(sass())
		.pipe(gulp.dest('./dist/css'))
		.pipe(cssmin())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(connect.reload());
});
gulp.task('js',function(){
	gulp.src(['src/js/jquery.min.js','src/js/main.js'])
		.pipe(gulp.dest('./dist/js'))
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(connect.reload());
});
gulp.task('html',['scss','js'],function(){
	gulp.src(['src/index.html'])
		.pipe(gulp.dest('./dist'))
		.pipe(inject(gulp.src(['dist/css/main.min.css','dist/js/all.min.js']),{relative:true}))
		.pipe(gulp.dest('./dist'))
		.pipe(connect.reload());
});
gulp.task('watch',['html'],function(){
	gulp.watch('src/sass/**/*',['scss']);
	gulp.watch('src/js/**/*',['js']);
	gulp.watch('src/**/*.html',['html']);
});
gulp.task('connect',['watch'],function(){
	connect.server({
		root:'dist',
		livereload:true
	});
});

gulp.task('default',['connect']);