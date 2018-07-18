const ejsexcel = require("ejsexcel");
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

(async function () {
    //获得Excel模板的buffer对象
    const exlBuf = await readFileAsync("./report.xlsx");
    //数据源
    const data = [
        [{
            "table_name": "现金报表",
            "date": '2014-04-09'
        }],
        [{
            "order_id": "NG20180718001255",
            "created": "2018-07-18 00:00:00",
            "order_type": "销售订单",
            "details": [{
                    'goods_no': '52222',
                    'goods_id': 236996666,
                    'num': 2,
                    'total_money': 236.5
                },
                {
                    'goods_no': '52223',
                    'goods_id': 236996266,
                    'num': 2,
                    'total_money': 123.3
                }
            ]
        }, {
            "order_id": "NG20180718001258",
            "created": "2018-07-17 00:00:00",
            "order_type": "售后服务单",
            "details": [{
                    'goods_no': '52222',
                    'goods_id': 236996666,
                    'num': 2,
                    'total_money': 236.5
                },
                {
                    'goods_no': '52223',
                    'goods_id': 236996266,
                    'num': 2,
                    'total_money': 123.3
                }
            ]
        }]
    ];
    //用数据源(对象)data渲染Excel模板
    const exlBuf2 = await ejsexcel.renderExcel(exlBuf, data);
    await writeFileAsync("./report2.xlsx", exlBuf2);
    console.log("生成report2.xlsx");
})();