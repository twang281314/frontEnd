console.time('for');
var j=0;
for(var i=0;i<10000000;i++){
 j += i/2;
}
console.log(j)
console.timeEnd('for');