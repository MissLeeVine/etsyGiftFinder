'use strict'

var path = {
	srcJS: "./dev/js/main.js",
	srcSCSS: "./dev/scss/**/*.scss",
	distCSS: "./public/css/",
	distJS: "./public/js/"
}

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const reload = browserSync.reload;

gulp.task('styles', () => {
	return gulp.src(path.srcSCSS)
		 .pipe(sourcemaps.init())
	    .pipe(sass().on('error', sass.logError))
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
	    .pipe(concat('main.css'))
	    .pipe(sourcemaps.write('.'))
	    .pipe(gulp.dest(path.distCSS))
	    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './public'  
  })
});

gulp.task('scripts', () => {
	gulp.src(path.srcJS)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(path.distJS))
    .pipe(reload({stream: true}));
});

gulp.task('watch', () => {
	gulp.watch(path.srcSCSS, ['styles']);
	gulp.watch(path.srcJS, ['scripts']);
	gulp.watch('./public/*.html', reload);
});

gulp.task('default', ['browser-sync','styles', 'scripts', 'watch']);