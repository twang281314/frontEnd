***打印模板***

修改日志

|版本号|修改内容|修改日期|修改人|
|---|----|----|---|
|v0.1|添加文档|2016-04-25|王涛|
|v0.2|添加和完善字段|2016-04-28|王涛|
|v0.3|完善后端接口文档|2016-04-29|王涛|
|v0.4|主表新增viewWidth、viewHeight、orient三个字段|2016-04-30|王涛|
|v0.5|修改itemCode、itemName、itemContent等字段的说明|2016-05-06|王涛|

# 打印模板功能设计

原型地址：  

```
http://192.168.6.179

```

功能设计地址：

```
http://192.168.6.146:8090/pages/viewpage.action?pageId=5833403

```

# 打印模板表结构设计

## 打印模板主表

|字段|描述|数据类型|备注|
|----|----|----|----|
|templateId|模板主键|double|模板主键|
|templateName|模板名称|string|模板名称|
|stockId|仓库ID|int|关联仓库|
|transporterId|运输商ID|int|运输商|
|shopIds|店铺ID|int|店铺|
|shopNames|店铺名称|string|店铺名称|
|templateType|模板类型|string|快递单、装箱单、发货单、拣选单、贺卡、发票等|
|pageWidth|宽度|int|宽度|
|pageHeight|高度|int|高度|
|pageTop|上偏移量|int|上偏移量|
|pageLeft|左偏移量|int|左偏移量|
|createDate|创建时间|datetime||
|createUser|创建人|int|创建人Id|
|updateDate|编辑时间|datetime||
|updateUser|修改人|int|修改人|
|isUse|是否使用|bool|模板是否在使用|
|viewWidth|可视编辑区域宽度|int|可视编辑区域宽度|
|viewHeight|可视编辑区域高度|int|可视编辑区域高度|
|orient|打印方向|int|1 纵(正)向打印，固定纸张<br> 2 横向打印，固定纸张 <br> 0(或其它) 打印方向由操作者自行选择或按打印机缺省设置|


## 打印模板从表

|字段|描述|数据类型|备注|
|----|----|----|----|
|templateDetailId|模板从表主键|double|模板从表主键|
|templateId|模板主表UKid|double|关联模板主表|
|itemType|打印项的基本属性|int|0 普通项<br>1 页眉页脚<br>2 页号项 <br>3 页数项<br> 4 多页项缺省<br>（不调用本函数时）值0|
|itemCustomType|打印项类型|int|0:固定文本打印项<br> 1:数据打印项(转换模板时需要绑定数据源)<br> 2:明细表格|
|itemClass|打印项对象类型|int| 2:普通文本<br> 31:矩形<br>32:实心矩形<br>33:椭圆<br> 34: 实心椭圆<br> 35:直线<br> 4:Htm超文本<br>8:图像<br>9:条码<br>|
|itemName|打印项对象名称|string|为保证能唯一识别打印项 该字段由前端按照规律动态生成一个唯一码|
|itemCode|打印项绑定的字段名称|string|对于数据打印项，对应于数据源字段名称<br>明细表格为固定值 detailTable<br> 固定文本项和itemName一样|
|itemTop|上边距|int|打印项在纸张内的上边距，整数或字符型，整数时缺省长度单位为px|
|itemLeft|左边距|int|打印项在纸张内的左边距，整数或字符型，整数时缺省长度单位为px|
|itemWidth|宽度|int|打印区域的宽度，整数或字符型，整数时缺省长度单位为px|
|itemHeight|高度|int|打印区域的高度，整数或字符型，整数时缺省长度单位为px|
|itemFontName|字体|string|与操作系统字体名一致，缺省是“宋体”|
|itemFontSize|字号|double|数值型 单位pt 缺省值9 可以为小数|
|itemFontColor|字体颜色|string|整数或字符型，整数时是颜色的十进制RGB值；字符时是超文本颜色值，<br/>可以是“#”加三色16进制值组合，<br/>也可以是英文颜色名；|
|itemContent|打印项内容|string|纯文本内容，字符型，未限制长度<br>itemCustomType=0时是打印内容<br>itemCustomType=1时是打印项中文名称<br>itemCustomType=2时是明细表格html代码|
|itemBold|是否粗体|int|1代表粗体，0代表非粗体，缺省值是0|
|itemItalic|是否斜体|int|1代表斜体，0代表非斜体，缺省值是0|
|itemUnderline|是否下划线|int|1代表有下划线，0代表无下划线，缺省值是0|
|itemAlignment|对齐方式|int|1--左靠齐 2--居中 3--右靠齐，缺省值是1|
|itemAngle|打印项旋转角度|int|逆时针旋转角度数，单位是度，0度表示不旋转，旋转时以对象的左上角为原点|
|itemPenWidth|线条宽度|int|单位是(打印)像素，缺省值是1，非实线的线条宽也是0|
|itemPenStyle|线条风格|int|0:实线  1:破折线 2:点线 3:点划线 4:双点划线 缺省值是0|
|itemReadOnly|是否禁止修改|bool|打印维护时,是否禁止修改|
|itemPreviewOnly|是否仅预览|bool|打印项是否仅预览|

# 打印模板数据接口

## 模板列表页(用于模板列表页获取数据)

### 请求地址

```
 http://192.168.200.71:8080/wos/printerTemplate/list
 
```
### 请求数据格式

```
{
    "currentPage": 1,
    "pageSize": 20,
    "sort": "stockId&asc",
    "filter": [
        {
            "filed": "templateType",
            "compare": "equal",
            "value": "dzmd",
            "datatype": string
        },
        {
            ....
        }
    ]
}

```

### 返回数据格式

```
{
  "errorCode": 0,
  "errorMsg": "",
  "data": {
    "currentPage": 1,
    "allNum": 3,
    "pageSize": 20,
    "contentList": [
      {
        "templateId": 131579000000010002,
        "templateType": "电子面单",
        "templateName": "打印模版",
        "stockId": 23025,
        "transporterId": 236,
        "shopIds": "2665",
        "shopNames": "测试",
        "isUse": 0,
        "createUser": 0,
        "updateUser": "",
        "createDate": "2016-04-28 16:13:23",
        "updateDate": "",
        "pageHeight": "",
        "pageWidth": 210,
        "pageTop": 2,
        "pageLeft": "",
        "dmPrinterDetailTemplate": []
      },
      {
        "templateId": 131579400000011000,
        "templateType": "电子面单",
        "templateName": "打印模版",
        "stockId": 23025,
        "transporterId": 236,
        "shopIds": "2665",
        "shopNames": "测试",
        "isUse": 0,
        "createUser": 0,
        "updateUser": "",
        "createDate": "2016-04-28 17:17:40",
        "updateDate": "",
        "pageHeight": "",
        "pageWidth": 210,
        "pageTop": 2,
        "pageLeft": "",
        "dmPrinterDetailTemplate": []
      },
      {
        "templateId": 131579700000010000,
        "templateType": "电子面单",
        "templateName": "打印模版",
        "stockId": 23025,
        "transporterId": 236,
        "shopIds": "2665",
        "shopNames": "测试",
        "isUse": 0,
        "createUser": 0,
        "updateUser": "",
        "createDate": "2016-04-28 16:06:42",
        "updateDate": "",
        "pageHeight": "",
        "pageWidth": 210,
        "pageTop": 2,
        "pageLeft": "",
        "dmPrinterDetailTemplate": []
      }
    ]
  }
}

```
## 模板详情接口(用于获取模板内容)

### 请求地址

```
http://192.168.200.71:8080/wos/printerTemplate/getDmPrinterTemplate

```

### 请求数据格式

```
{
    "templateUkid":"131579700000010000"
}

```

### 返回数据格式 

```
{
    "templateId": 131579700000010000,
    "templateType": "电子面单",
    "templateName": "打印模版",
    "stockId": 23025,
    "transporterId": 236,
    "shopIds": "2665",
    "shopNames": "测试",
    "isUse": 0,
    "createUser": 0,
    "updateUser": "",
    "createDate": "2016-04-28 16:06:42",
    "updateDate": "",
    "pageHeight": "",
    "pageWidth": 210,
    "pageTop": 2,
    "pageLeft": "",
    
    "dmPrinterDetailTemplate" :[
     {
            "templateDetailUkid" : "023666",
            "itemName" : "orderNo",
            "itemContent" : "订单号",
            "itemCode" : "orderNo",
            "itemClass" : 2,
            "itemTop" : "96",
            "itemLeft" : "122",
            "itemWidth" : "60",
            "itemHeight" : "20",
            "itemFontName" : "宋体",
            "itemFontSize" : 9,
            "itemColor" : "#000000",
            "itemBold" : 0,
            "itemItalic" : 0,
            "itemUnderline" : 0,
            "itemAlignment" : 0,
            "itemAngle" : 0,
            "itemPenWidth" : 1,
            "itemPenHeight" : "",
            "itemOnlyRead" : "",
            "itemPreviewOnly" : "0"
    },{
            "templateDetailUkid" : "2365555",
            "itemName" : "orderNo",
            "itemContent" : "订单号",
            "itemCode" : "orderNo",
            "itemClass" : 2,
            "itemTop" : "96",
            "itemLeft" : "122",
            "itemWidth" : "60",
            "itemHeight" : "20",
            "itemFontName" : "宋体",
            "itemFontSize" : 9,
            "itemColor" : "#000000",
            "itemBold" : 0,
            "itemItalic" : 0,
            "itemUnderline" : 0,
            "itemAlignment" : 0,
            "itemAngle" : 0,
            "itemPenWidth" : 1,
            "itemPenHeight" : "",
            "itemOnlyRead" : "",
            "itemPreviewOnly" : "0"
    }]
}

```

## 模板设计编辑接口(用于新增和编辑模板内容)

### 请求地址

```
 http://192.168.200.71:8080/wos/printerTemplate/modifyDmPrinterTemplate
 
```

### 请求数据格式

#### 列表页编辑按钮

此时只修改模板主表数据

```
{
    
    "templateName":"通用电子面单",
    "templateType": "电子面单",
    "stockId": 23025,
    "transporterId": 236,
    "shopIds": "2665",
    "shopNames": "测试",
    "isUse": 0,
    "createUser": 0,
    "updateUser": "",
    "createDate": "2016-04-28 16:06:42",
    "updateDate": "",
    "pageHeight": "",
    "pageWidth": 210,
    "pageTop": 2,
    "pageLeft": "",
    "dmPrinterDetailTemplate" : []
    
}

```
#### 列表页设计按钮

此时请求数据会同时包括主表数据和从表数据

```
{
    "templateName":"通用电子面单",
    "templateType": "电子面单",
    "stockId": 23025,
    "transporterId": 236,
    "shopIds": "2665",
    "shopNames": "测试",
    "isUse": 0,
    "createUser": 0,
    "updateUser": "",
    "createDate": "2016-04-28 16:06:42",
    "updateDate": "",
    "pageHeight": "",
    "pageWidth": 210,
    "pageTop": 2,
    "pageLeft": "",
    "dmPrinterDetailTemplate" : [
        {
            "templateDetailUkid" : "0",
            "itemName" : "orderNo",
            "itemContent" : "订单号",
            "itemCode" : "orderNo",
            "itemClass" : 2,
            "itemTop" : "96",
            "itemLeft" : "122",
            "itemWidth" : "60",
            "itemHeight" : "20",
            "itemFontName" : "宋体",
            "itemFontSize" : 9,
            "itemColor" : "#000000",
            "itemBold" : 0,
            "itemItalic" : 0,
            "itemUnderline" : 0,
            "itemAlignment" : 0,
            "itemAngle" : 0,
            "itemPenWidth" : 1,
            "itemPenHeight" : "",
            "itemOnlyRead" : "",
            "itemPreviewOnly" : "0"
        },
        {
            "itemName" : "printer",
            "itemContent" : "打单员",
            "itemCode" : "printer",
            "itemClass" : 2,
            "itemTop" : "407",
            "itemLeft" : "118",
            "itemWidth" : "75",
            "itemHeight" : "20",
            "itemFontName" : "宋体",
            "itemFontSize" : 9,
            "itemColor" : "#000000",
            "itemBold" : 0,
            "itemItalic" : 0,
            "itemUnderline" : 0,
            "itemAlignment" : 0,
            "itemAngle" : 0,
            "itemPenWidth" : 1,
            "itemPenHeight" : "",
            "itemOnlyRead" : "",
            "itemPreviewOnly" : "0"
        },
        {
            "itemName" : "printTime",
            "itemContent" : "打单时间",
            "itemCode" : "printTime",
            "itemClass" : 2,
            "itemTop" : "407",
            "itemLeft" : "274",
            "itemWidth" : "100",
            "itemHeight" : "20",
            "itemFontName" : "宋体",
            "itemFontSize" : 9,
            "itemColor" : "#000000",
            "itemBold" : 0,
            "itemItalic" : 0,
            "itemUnderline" : 0,
            "itemAlignment" : 0,
            "itemAngle" : 0,
            "itemPenWidth" : 1,
            "itemPenHeight" : "",
            "itemOnlyRead" : "",
            "itemPreviewOnly" : "0"
        },
        {
            "itemName" : "userNick",
            "itemContent" : "买家昵称",
            "itemCode" : "userNick",
            "itemClass" : 2,
            "itemTop" : "119",
            "itemLeft" : "122",
            "itemWidth" : "120",
            "itemHeight" : "19",
            "itemFontName" : "宋体",
            "itemFontSize" : 9,
            "itemColor" : "#000000",
            "itemBold" : 0,
            "itemItalic" : 0,
            "itemUnderline" : 0,
            "itemAlignment" : 0,
            "itemAngle" : 0,
            "itemPenWidth" : 1,
            "itemPenHeight" : "",
            "itemOnlyRead" : "",
            "itemPreviewOnly" : "0"
        },
        {
            "itemName" : "mobile",
            "itemContent" : "手机号码",
            "itemCode" : "mobile",
            "itemClass" : 2,
            "itemTop" : "142",
            "itemLeft" : "122",
            "itemWidth" : "120",
            "itemHeight" : "20",
            "itemFontName" : "宋体",
            "itemFontSize" : 9,
            "itemColor" : "#000000",
            "itemBold" : 0,
            "itemItalic" : 0,
            "itemUnderline" : 0,
            "itemAlignment" : 0,
            "itemAngle" : 0,
            "itemPenWidth" : 1,
            "itemPenHeight" : "",
            "itemOnlyRead" : "",
            "itemPreviewOnly" : "0"
        },
        {
            "itemName" : "province",
            "itemContent" : "省份",
            "itemCode" : "province",
            "itemClass" : 2,
            "itemTop" : "165",
            "itemLeft" : "126",
            "itemWidth" : "40",
            "itemHeight" : "20",
            "itemFontName" : "宋体",
            "itemFontSize" : 9,
            "itemColor" : "#000000",
            "itemBold" : 0,
            "itemItalic" : 0,
            "itemUnderline" : 0,
            "itemAlignment" : 0,
            "itemAngle" : 0,
            "itemPenWidth" : 1,
            "itemPenHeight" : "",
            "itemOnlyRead" : "",
            "itemPreviewOnly" : "0"
        },
        {
            "itemName" : "city",
            "itemContent" : "市(州)",
            "itemCode" : "city",
            "itemClass" : 2,
            "itemTop" : "165",
            "itemLeft" : "166",
            "itemWidth" : "80",
            "itemHeight" : "20",
            "itemFontName" : "宋体",
            "itemFontSize" : 9,
            "itemColor" : "#000000",
            "itemBold" : 0,
            "itemItalic" : 0,
            "itemUnderline" : 0,
            "itemAlignment" : 0,
            "itemAngle" : 0,
            "itemPenWidth" : 1,
            "itemPenHeight" : "",
            "itemOnlyRead" : "",
            "itemPreviewOnly" : "0"
        },
        {
            "itemName" : "district",
            "itemContent" : "区(县)",
            "itemCode" : "district",
            "itemClass" : 2,
            "itemTop" : "165",
            "itemLeft" : "246",
            "itemWidth" : "80",
            "itemHeight" : "20",
            "itemFontName" : "宋体",
            "itemFontSize" : 9,
            "itemColor" : "#000000",
            "itemBold" : 0,
            "itemItalic" : 0,
            "itemUnderline" : 0,
            "itemAlignment" : 0,
            "itemAngle" : 0,
            "itemPenWidth" : 1,
            "itemPenHeight" : "",
            "itemOnlyRead" : "",
            "itemPreviewOnly" : "0"
        },
        {
            "itemName" : "address",
            "itemContent" : "地址",
            "itemCode" : "address",
            "itemClass" : 2,
            "itemTop" : "165",
            "itemLeft" : "326",
            "itemWidth" : "215",
            "itemHeight" : "20",
            "itemFontName" : "宋体",
            "itemFontSize" : 9,
            "itemColor" : "#000000",
            "itemBold" : 0,
            "itemItalic" : 0,
            "itemUnderline" : 0,
            "itemAlignment" : 0,
            "itemAngle" : 0,
            "itemPenWidth" : 1,
            "itemPenHeight" : "",
            "itemOnlyRead" : "",
            "itemPreviewOnly" : "0"
        }
    ]
}

```

###  返回数据格式

```

{
    errorCode : 0, //错误代码：如果为0则表示成功，其他均为失败
    errorMsg : ”error”, //错误信息。如果正确则为null
    data :
    {
        templateId : ”21321”
    } //成功时返回

}

```
