var fs = require('fs');

fs.readFile('dis.json', 'utf8', function (err, data) {
    if (err) console.log(err);
    var test1 = JSON.parse(data);
    test1.forEach(function (item) {
        item.id = item.id + 405;
        item.pId = item.pId + 34;
    });
    var t = JSON.stringify(test1);
    fs.writeFileSync('test1.json', t)
});