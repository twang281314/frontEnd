##安装
引入js和css
```html
    <link rel="stylesheet" href="lib/ztree/zTreeStyle.css"/>
    <link rel="stylesheet" href="dist/treeSelect.css"/>
    <script src="http://cdn.bootcss.com/jquery/1.11.3/jquery.js"></script>
    <script src="lib/ztree/jquery.ztree.core-3.5.js"></script>
    <script src="dist/treeSelect.js"></script>
```


##使用
```javascript

    var sexNode=[
        {
            name:'男',
            value:'1',
            children:[
                {
                    name:'好基友'
                }
            ]
        }  ,
        {
            name:'女',
            value:'2'
        }
    ];
    var sexInput=new TreeSelect({
        element:'#sex',
        data:sexNode
    });
```

##配置(option)

element:jquery选择器
data:ztree格式的数据源


##开发
1.使用babel来进行编译 需要先安装[babel](https://babeljs.io/)

2.执行bash

```

babel treeSelect.js  --out-file dist/treeSelect.js --source-maps --watch

```

3.watch.sh也可以实现监听
```
    1.添加权限
     chmod +x watch.sh
    2.执行
    ./watch.sh
``
