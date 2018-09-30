var Excel = require('exceljs');

var start_time = new Date();
// var workbook = new Excel.stream.xlsx.WorkbookWriter({
//     filename: './streamed-workbook.xls'
// });
var workbook = new Excel.Workbook();
var worksheet = workbook.addWorksheet('Sheet');

worksheet.columns = [{
        header: '订单号',
        key: 'id',
        width: 20,
        style: {
            font: {
                size: 20,
                underline: true
            }
        }
    },
    {
        header: '姓名',
        key: 'name',
        style:{
            alignment: {wrapText: true} 
        }
    },
    {
        header: '电话',
        key: 'phone'
    }
];

var data = [{
        id: 100,
        name: 'abc',
        phone: '123456789'
    },
    {
        id: 100,
        name: 'def',
        phone: '123456789'
    }
];
var length = data.length;

// 当前进度
var current_num = 0;
var time_monit = 400;
var temp_time = Date.now();

console.log('开始添加数据');

// 开始添加数据
for (let i in data) {
    let row = worksheet.addRow(data[i]);
    row.eachCell(function (cell) {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
                argb: 'deeded'
            }
        };
        cell.font = {
            name: 'Arial',
            size: 14
        };
        cell.alignment = {
            horizontal: 'center'
        };
        cell.border = {
            top: {
                style: "thin"
            },
            left: {
                style: "thin"
            },
            bottom: {
                style: "thin"
            },
            right: {
                style: "thin"
            }
        };
    });
    // row.commit();
    current_num = i;
    if (Date.now() - temp_time > time_monit) {
        temp_time = Date.now();
        console.log((current_num / length * 100).toFixed(2) + '%');
    }
}
console.log('添加数据完毕：', (Date.now() - start_time));
// worksheet.spliceRows(1,2);
// worksheet.mergeCells('A2:A3');
// worksheet.getColumn('name').alignｍent = {
//     vertical: 'middle',
//     horizontal: 'center'
// };
// worksheet.getCell('B1').alignment = {
//     wrapText: true
// };
// worksheet.getCell('A1').font = {
//     name: 'Arial Black',
//     color: {
//         argb: 'FF00FF00'
//     },
//     family: 2,
//     size: 20,
//     italic: true
// };
worksheet.getRow(2).font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
// worksheet.commit();
// workbook.commit();
// worksheet.mergeCells('A2', 'A3');

var end_time = new Date();
var duration = end_time - start_time;

console.log('用时：' + duration);
console.log("程序执行完毕");