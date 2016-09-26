> 分享4个网址二维码API接口


```
说明：把url=后面的网址改成你的，四种任选一。
http://pan.baidu.com/share/qrcode?w=150&h=150&url=http://lanyes.org
http://b.bshare.cn/barCode?site=weixin&url=http://lanyes.org
http://s.jiathis.com/qrcode.php?url=http://lanyes.org
http://www.kuaizhan.com/common/encode-png?large=true&data=http://lanyes.org
说明：下面是EMLOG程序专用的，把代码复制到EMLOG模板echo_log.php你需要的位置即可。
http://b.bshare.cn/barCode?site=weixin&url=<?php echo Url::log($logid);?>
http://s.jiathis.com/qrcode.php?url=<?php echo Url::log($logid);?> 

```