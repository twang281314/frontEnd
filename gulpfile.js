var gulp = require('gulp');
//var i5ting_toc = require('gulp-i5ting-toc');
var tocmd = require('./index');
var fs = require('fs')

var pwd = process.cwd()

// var source_file_name = pwd + '/' + source_file
// var file_name = source_file_name.split('/').pop();;
// var _file_name = file_name.split('.')[0];

// var dest_file_path = pwd + '/preview/' + _file_name + '.html';

// console.log('pwd=' + pwd);
// console.log('source_file_name=' + source_file_name);
// console.log('dest_file_path=' + dest_file_path);

var opt = {
    source_file_name: 'useMarkdown.md',
    is_open: true,
    debug: false,
    markd_config: {
        debug: false
    }
}

/**
 * 将当前目录下所有的md文件生成html
 */
gulp.task('build', function() {

    fs.readdir('.', function(err, data) {
        data.forEach(function(name) {
            if (name.lastIndexOf('.md') > 0) {
                var tempName = name.replace('.md', '').trim();
                //console.log(tempName);
                tocmd(pwd, name, 'preview/' + tempName + '.html', false, opt)
            }
        });
    });
});