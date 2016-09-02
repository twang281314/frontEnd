var gulp = require('gulp');
var base64 = require('gulp-base64');
var cssBase64 = require('gulp-css-base64');

gulp.task('copy', function() {

    return gulp.src(['src/*/**','src/index.html'])
        .pipe(gulp.dest('dist'));;
});

gulp.task('build', ['copy'], function() {

    return gulp.src('src/app.css')
          .pipe(base64({
            maxImageSize: 8*1024*1024, // bytes,默认值比较小 而且不提示 是个坑
            debug: true
          }))
         .pipe(gulp.dest('dist'));
});

gulp.task('build2', function() {
    return gulp.src('./*.css')
        .pipe(base64())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('default', function() {
    return gulp.src('app.css')
        .pipe(cssBase64())
        .pipe(gulp.dest('dist'));
});