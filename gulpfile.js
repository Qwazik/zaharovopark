"use strict"

var gulp        = require('gulp'),
	browserSync = require('browser-sync'),
	sass        = require('gulp-sass'),
	prefixer	= require('gulp-autoprefixer'),
	imagemin	= require('gulp-imagemin'),
	pngquant	= require('imagemin-pngquant'),    
    notify      = require("gulp-notify"),
    zip         = require('gulp-zip'),
    jade     	= require('gulp-jade'),
    rename      = require("gulp-rename"),
    cleanCSS    = require('gulp-clean-css'),
    spritesmith = require('gulp.spritesmith'),
    watch       = require('gulp-watch'),
    reload		= browserSync.reload,
    page 		= 'press.html';

// Static Server + watching scss/html files
gulp.task('templates', function() {

    var YOUR_LOCALS = {};

    return gulp.src('./src/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .on("error", notify.onError({
            message: "Ошибка: <%= error.message %>",
            title: "Ошибка запуска"}))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('jade-watch', ['templates'], reload);

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./src/scss/style.scss")
        .pipe(sass())
        .on("error", notify.onError({
            message: "Ошибка: <%= error.message %>",
            title: "Ошибка запуска"}))
        .pipe(prefixer({
        	browsers: ['ie 8', 'last 15 versions']
        }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(rename('style.min.css'))
        .pipe(cleanCSS({compability: 'ie8'}))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('img', function() {
    return gulp.src('./src/img/*')
    	.pipe(gulp.dest('./src/img/'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./src/img/'))
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('js', function() {
    return gulp.src('./src/js/**/*')
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('libs', function() {
    return gulp.src('./src/libs/**/*')
        .pipe(gulp.dest('./dist/libs/'));
});


gulp.task('finish', ['sass', 'templates', 'img', 'fonts', 'js', 'libs'], () => {
    return gulp.src('./dist/**/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('./src/icons/*.png').pipe(spritesmith({
    imgName: 'icon-set.png',
    cssName: 'sprite.scss',
    imgPath: '../img/icon-set.png'
  }));
  spriteData.img.pipe(gulp.dest('./src/img'));
  spriteData.img.pipe(gulp.dest('./dist/img'));
  spriteData.css.pipe(gulp.dest('./src/scss/settings'));
});

gulp.task('default', ['sass', 'templates', 'img', 'fonts', 'js', 'libs'], function () {
    browserSync({server: './dist'});
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.jade', ['jade-watch']);
    gulp.watch('./src/js/**/*.js', ['js']);
});

//gulp.task('default', function () {
//    watch('./src/img/', batch(function (events, done) {
//        gulp.start('img', done);
//    }));
//});