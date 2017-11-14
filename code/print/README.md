基于 Lodop 的 web 打印示例
---

### 相关资源

+ 官网下载中心（程序+文档）：[http://www.lodop.net/download.html](http://www.lodop.net/download.html)
+ 官方打印示例：[http://www.lodop.net/demo.html](http://www.lodop.net/demo.html)
+ 常见问题列表：[http://www.lodop.net/problem.html](http://www.lodop.net/problem.html)

### 一个发运单打印的 Demo

+ demo 结构

  > 其中使用 layui 处理弹窗；data.json 是模拟数据

  ```
  .
  ├── assets
  │   ├── images
  │   │   ├── layer-btn-cancel-hover.png
  │   │   ├── layer-btn-cancel.png
  │   │   ├── layer-btn-ok-hover.png
  │   │   ├── layer-btn-ok.png
  │   │   ├── layui-layer-title-close-hover.png
  │   │   ├── layui-layer-title-close.png
  │   │   └── layui-layer-title-info.png
  │   ├── jquery.min.js
  │   ├── jquery.tmpl.js
  │   ├── layer
  │   │   ├── extend
  │   │   │   └── layer.ext.js
  │   │   ├── layer.js
  │   │   └── skin
  │   │       ├── default
  │   │       │   ├── icon-ext.png
  │   │       │   ├── icon.png
  │   │       │   ├── loading-0.gif
  │   │       │   ├── loading-1.gif
  │   │       │   └── loading-2.gif
  │   │       ├── layer.css
  │   │       └── layer.ext.css
  │   ├── lodop
  │   │   ├── CLodop_Setup_for_Win32NT.exe
  │   │   ├── LodopFuncs.js
  │   │   ├── install_lodop32.exe
  │   │   └── install_lodop64.exe
  │   └── my.js
  ├── data.json
  └── index.html
  ```


+ 预览效果如下

![预览图片）](./screenhot.png)


### 关于连打

- 连打关键点

  > 1. 通过**进纸调节器按钮**，调整打印机的默认纸型。如果你的打印机没有这个类似的按钮，可询问客服具体调节方法。
  >
  > 2. 调整打印模板，在程序里设置打印纸型 

- 具体实现方法
    
    > 参照 Demo，主要作如下修改：

    ```JavaScript

    …略…

    LODOP = getLodop();
    LODOP.PRINT_INITA(0,10,"24.1cm","13.9cm","");
    LODOP.SET_PRINT_PAGESIZE(1,"24.1cm","13.9cm","CreateCustomPage");
    LODOP.SET_PRINT_MODE("CREATE_CUSTOM_PAGE_NAME","fyd_print_1");
    // LODOP.SET_PRINT_MODE("POS_BASEON_PAPER",true);
    // LODOP.SET_PREVIEW_WINDOW(1,0,0,1000,600,""); // 初始预览窗口大小
    // LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1); // 横向打印时正向显示
    LODOP.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW",1); // 打印后自动关闭预览
    LODOP.SET_PRINT_MODE("CUSTOM_TASK_NAME","发运单打印"); // 打印队列中的文档名
    LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD",1); // 去除背景滚动线

    …略…

    ```

    > 至于打印模板的调整，可使用 Lodop 打印设计功能，或一点点打印预览进行调节。

- 其它相关常见问题
  - [如何避免Lodop本地配置影响](http://www.c-lodop.com/faq/pp9.html)
  - [打印位置不同，偏移量问题](http://www.c-lodop.com/faq/pp17.html)
