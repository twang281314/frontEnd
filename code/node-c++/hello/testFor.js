console.time('for');
var hello = require('.//build/Release/hello.node').hello;
console.log(hello)
console.timeEnd('for');