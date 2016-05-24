**api接口说明**

>针对前后端api的总体说明

# 系统级输入参数

API参数共由两部分组成, 系统级参数指所有由 后端 提供的API所必须的参数, 应用级参数是指对应API所需的参数。 
在没有特别说明的一般情况下, 系统级参数是调用API时所必须传递的参数

|参数名称|参数类型|参数描述|
|--|--|--|
|Content-Type|string|请求数据类型|
|m|string|模块名称，自定义(web,android,ios)。便于进行接口统计|
|v|string|api版本|
|t|string|请求时间戳|
|token|string|访问码 由登陆接口获取|
|sign|string|签名|

系统级参数全部放入请求header中

angularjs

``` js
config.headers = config.headers || {};
var token = app.caches.getItem("token");
var userId = app.caches.getItem('userId');
if (!!token)
{
    var timeStamp = new Date().Format('yyyy-MM-dd hh:mm:ss');
    config.headers["Content-Type"] = "application/json";
    config.headers["m"] = "web";
    config.headers["v"] = app.caches.getItem('version');
    config.headers["t"] = timeStamp;
    config.headers["token"] = token;
    //由token + t + m + userId 以编码utf-8获取md5，将md5字符串转成大写
    config.headers["sign"] = md5.createHash(token + timeStamp + 'web' + userId).toUpperCase();
    //console.log(config.headers["sign"]);
}
return config;

```

jquery

``` js
//通过jquery发送请求
service.ajaxSend = function (req)
{
    //设置headers
    var token = app.caches.getItem("token");
    var userId = app.caches.getItem("userId");
    var timeStamp = new Date().Format("yyyy-MM-dd hh:mm:ss");
    var sign = md5.createHash(token + timeStamp + "web" + userId).toUpperCase();

    loading.show();
    req = $.extend(
        {

            contentType : "application/json",

            headers :
            {
                "m" : "web",
                "v" : app.caches.getItem('version'),
                "t" : timeStamp,
                "token" : token,
                "sign" : sign
            }
        }, req);

    var dtd = $.Deferred();

    $.ajax(req)
    .done(function (response)
    {
        loading.hide();
        //若将dataType设为json 序列化会出现精度丢失问题
        //因此在这里进行序列化
        dtd.resolve(JSON.parse(response));
    }
    )
    .fail(function (response)
    {
        loading.hide();
        dtd.reject(response);
    }
    );

    return dtd.promise();
}

```

# 返回参数格式说明

``` json

{
    "code" : "4",//返回编码
    "msg" : "",//返回信息
    "data" : ""//返回数据
}

```

# 全局错误返回码说明

## 错误码说明

在返回的json里，错误码说明如下：

code为0代表响应成功
非0时表示接口调用失败 发生异常

## 错误码列表

### 系统级错误

|错误码|错误描述|解决方案|
|-----|---|----|
|1|系统错误|系统发生错误,请联系管理员.iscs@iscs.com.cn|
|2|必要参数丢失||
|3|参数不合法(参数类型不对，例如：需要传入的是数字类型的，却传入了字符类型的参数)||
|4|token不存在或已失效||
|5|计算签名错误！非法请求||
|6|检查权限失败（用户没有操作权限）||
|7|方法不存在||

### 业务级错误

|错误码|错误描述|解决方案|
|--|--|--|
|52|缺少必选参数||
|53|参数不合法(参数类型不对，例如：需要传入的是数字类型的，却传入了字符类型的参数)||