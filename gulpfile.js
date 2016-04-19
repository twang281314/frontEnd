var gulp = require('gulp');
var i5ting_toc = require('gulp-i5ting-toc');

var opt = {
    source_file_name: 'sample.md',
    is_open: true,
    markd_config: {
        debug: false
    }
}

gulp.task('default', function() {
    gulp.src('sample.md')
        .pipe(i5ting_toc(opt));
});