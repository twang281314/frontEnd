const fs = require('fs');

// 对 fs 模块进行 Promise 封装
const readFile = function(src) {
    return new Promise((resolve,reject) => {
        fs.readFile(src,(err,data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}

// Promise 的写法

readFile('./a.txt').then(data => {
    console.log(data.toString());
    return readFile('./b.txt');
}).then(data => {
    console.log(data.toString());
    return readFile('./c.txt');
}).then(data => {
    console.log(data.toString());
})

// Generator 函数写法

function * ascReadFile() {
    yield readFile('./a.txt');
    yield readFile('./b.txt');
    yield readFile('./c.txt');
}

let g = ascReadFile();
g.next().value.then(data => {
    console.log(data.toString());
    return g.next().value;
}).then(data => {
    console.log(data.toString());
    return g.next().value;
}).then(data => {
    console.log(data.toString());
})

// async 函数写法
async function asyncReadFile() {
    let a = await readFile('./a.txt');
    console.log(a.toString());

    let b = await readFile('./b.txt');
    console.log(b.toString());

    let c = await readFile('./c.txt');
    console.log(c.toString());
}
asyncReadFile();