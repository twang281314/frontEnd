> HTML5获取地理位置定位信息

HTML5提供了地理位置定位功能（Geolocation API），能确定用户位置，我们可以借助HTML5的该特性开发基于地理位置信息的应用。本文结合实例给大家分享如何使用HTML5，借助百度、谷歌地图接口来获取用户准确的地理位置信息。

# 如何使用HTML5地理位置定位功能

定 位功能（Geolocation）是HTML5的新特性，因此只有在支持HTML5的现代浏览器上运行，特别是手持设备如iphone，地理定位 更加精确。首先我们要检测用户设备浏览器是否支持地理定位，如果支持则获取地理信息。注意这个特性可能侵犯用户的隐私，除非用户同意，否则用户位置信息是 不可用的，所以我们在访问该应用时会提示是否允许地理定位，我们当然选择允许即可。

``` js
function getLocation(){ 
    if (navigator.geolocation){ 
        navigator.geolocation.getCurrentPosition(showPosition,showError); 
    }else{ 
        alert("浏览器不支持地理定位。"); 
    } 
}

```

上面的代码可以知道，如果用户设备支持地理定位，则运行 getCurrentPosition() 方法。如果getCurrentPosition()运行成功，则向参数showPosition中规定的函数返回一个coordinates对 象，getCurrentPosition() 方法的第二个参数showError用于处理错误，它规定当获取用户位置失败时运行的函数。
我们先来看函数showError()，它规定获取用户地理位置失败时的一些错误代码处理方式：

``` js
function showError(error){ 
    switch(error.code) { 
        case error.PERMISSION_DENIED: 
            alert("定位失败,用户拒绝请求地理定位"); 
            break; 
        case error.POSITION_UNAVAILABLE: 
            alert("定位失败,位置信息是不可用"); 
            break; 
        case error.TIMEOUT: 
            alert("定位失败,请求获取用户位置超时"); 
            break; 
        case error.UNKNOWN_ERROR: 
            alert("定位失败,定位系统失效"); 
            break; 
    } 
}
```

我们再来看函数showPosition(),调用coords的latitude和longitude即可获取到用户的纬度和经度。

``` js
function showPosition(position){ 
    var lat = position.coords.latitude; //纬度 
    var lag = position.coords.longitude; //经度 
    alert('纬度:'+lat+',经度:'+lag); 
}

```

# 利用百度地图和谷歌地图接口获取用户地址

上面我们了解了HTML5的Geolocation可以获取用户的经纬 度，那么我们要做的是需要把抽象的经纬度转成可读的有意义的真正的用户地理位 置信息。幸运的是百度地图和谷歌地图等提供了这方面的接口，我们只需要将HTML5获取到的经纬度信息传给地图接口，则会返回用户所在的地理位置，包括省 市区信息，甚至有街道、门牌号等详细的地理位置信息。
我们首先在页面定义要展示地理位置的div，分别定义id#baidu_geo和 id#google_geo。我们只需修改关键函数 showPosition()。先来看百度地图接口交互，我们将经纬度信息通过Ajax方式发送给百度地图接口，接口会返回相应的省市区街道信息。百度地 图接口返回的是一串JSON数据，我们可以根据需求将需要的信息展示给div#baidu_geo。注意这里用到了jQuery库，需要先加载 jQuery库文件。

``` js
function showPosition(position){ 
    var latlon = position.coords.latitude+','+position.coords.longitude; 
     
    //baidu 
    var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+latlon+"&output=json&pois=0"; 
    $.ajax({  
        type: "GET",  
        dataType: "jsonp",  
        url: url, 
        beforeSend: function(){ 
            $("#baidu_geo").html('正在定位...'); 
        }, 
        success: function (json) {  
            if(json.status==0){ 
                $("#baidu_geo").html(json.result.formatted_address); 
            } 
        }, 
        error: function (XMLHttpRequest, textStatus, errorThrown) {  
            $("#baidu_geo").html(latlon+"地址位置获取失败");  
        } 
    }); 
});

```

再来看谷歌地图接口交互。同样我们将经纬度信息通过Ajax方式发送给谷歌地图接口，接口会返回相应的省市区街道详细信息。谷歌 地图接口返回的也是一串 JSON数据，这些JSON数据比百度地图接口返回的要更详细，我们可以根据需求将需要的信息展示给div#google_geo。

``` js
function showPosition(position){ 
    var latlon = position.coords.latitude+','+position.coords.longitude; 
 
    //google 
    var url = 'http://maps.google.cn/maps/api/geocode/json?latlng='+latlon+'&language=CN'; 
    $.ajax({  
        type: "GET", 
        url: url,  
        beforeSend: function(){ 
            $("#google_geo").html('正在定位...'); 
        }, 
        success: function (json) {  
            if(json.status=='OK'){ 
                var results = json.results; 
                $.each(results,function(index,array){ 
                    if(index==0){ 
                    $("#google_geo").html(array['formatted_address']); 
                    } 
                }); 
            } 
        }, 
        error: function (XMLHttpRequest, textStatus, errorThrown) {  
            $("#google_geo").html(latlon+"地址位置获取失败");  
        }  
    }); 
}
```

以上的代码分别将百度地图接口和谷歌地图接口整合到函数showPosition()中，我们可以根据实际情况进行调用。当然这只是一个简单的应用，我们可以根据这个简单的示例开发出很多复杂的应用