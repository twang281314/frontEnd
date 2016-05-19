#!/usr/bin/env node

/**
 * Module dependencies.
 */
function isDefined(x) { return x !== null && x !== undefined; } 
Array.prototype.contain = function(obj) {
  return this.indexOf(obj) !== -1;
}

var program = require('commander');
var version = require("../package.json").version;

program
  .version(version)
	.usage(" a node npm wrapper of i5ting_ztree_toc https://github.com/i5ting/i5ting_ztree_toc ")
  .option('-f, --file [filename]', ' default is README.md ')
	.option('-o, --open', 'open in browser')
	.option('-v, --verbose', '打印详细日志')
  .parse(process.argv);
	
var pwd = process.cwd()  
var filename = "README.md";
var is_open = false;

if (program.file) {
	filename = program.file;
}

if (program.open) {
	is_open = program.open;
}

var verbose = false;
if (program.verbose) {
	verbose = program.verbose;
}

var _verbose = verbose;
function log(str){
	if(_verbose == true){
		console.log(str);
	}
}

log('filename = ' + filename); 
log('verbose = ' + verbose);

var source_file = filename;

var markd_config = {
	debug: false
}

//函数可以返回当前正在执行的项目路径
var pwd = process.cwd()  

var source_file_name = pwd + '/' + source_file
var file_name = source_file_name.split('/').pop();;
var _file_name = file_name.split('.')[0];

var dest_file_path = pwd + '/preview/' + _file_name + '.html';

console.log('pwd=' + pwd);
console.log('source_file_name=' + source_file_name);
console.log('dest_file_path=' + dest_file_path);

require('../index')(pwd, source_file_name, dest_file_path, is_open, markd_config);