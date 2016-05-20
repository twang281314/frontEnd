** ims - 原始订单处理中心**

>将平台的订单下载至原始订单处理中心,然后将订单进行处理.最后传入oms系统进行处理.
  
修改日志
  
|版本号|修改内容|修改日期|修改人|
|---|----|----|---|
|v0.1|第一次创建文档|2016-04-26|徐纯|
|v0.2|修改一些细节问题|2016-04-26|徐纯|
|v0.2|修改一些细节问题|2016-04-26|徐纯|

# 平台退款单

|环境|HTTP请求地址|HTTPS请求地址|
|---|---|---|
|正式环境|http://192.168.6.143:8080/originRefund|https://192.168.6.143:8080/originRefund|
|测试环境|http://192.168.6.143:8080/originRefund|https://192.168.6.143:8080/originRefund|

## 列表页

### 请求url

```
/list

```
### 请求参数

|名称|类型|是否必须|示例值|更多限制|描述|
|---|---|---|---|---|---|
|currentPage|int|必须|1||第几页|
|pageSize|int|必须|20||每页数量|
|sort|int|否|orderId&asc|只能按一个字段排序|排序字段 asc升序 desc降序|
|filter|string|否| [{"filed": "shopId","compare": "equal","value": "100","datatype": "number"}]||查询条件|

### 响应参数

### 请求示例

``` json
 {
   "currentPage" : 1,
   "filter" : [
      {
         "compare" : "equal",
         "datatype" : "number",
         "filed" : "shopId",
         "value" : "100"
      }
   ],
   "pageSize" : 20,
   "sort" : "orderId&asc"
}
        
```

### 响应示例

``` json
{
   "code" : 0,
   "data" : {
      "allNum" : 17,
      "contentList" : [
         {
            "buyerNick" : "",
            "downTime" : "2016-04-13 14:40:07",
            "goodStatus" : "",
            "hasGoodsReturn" : 1,
            "iscsReceiptStatus" : "",
            "modifyTime" : "2016-04-13 14:40:07",
            "orderId" : "10027064534",
            "orderPayment" : 49.50,
            "orderStatus" : "",
            "outerId" : "",
            "platformId" : 10,
            "platformRefundStatus" : "",
            "processStatus" : 10,
            "productName" : "",
            "productNumId" : "",
            "refundCreateTime" : "",
            "refundFee" : 49.50,
            "refundId" : 123456,
            "refundUkid" : 111564100000013003,
            "remark" : "",
            "returnOutSid" : "",
            "returnReason" : "",
            "returnTmsCode" : "20",
            "serviceStatus" : "",
            "shopId" : 10,
            "skuNumId" : "",
            "subOrderId" : "",
            "targetOrderUkid" : 10
         }
      ],
      "currentPage" : 2,
      "pageNum" : 2,
      "pageSize" : 1
   },
   "msg" : ""
}

```
### 错误码解释

## 退款单详情

### 请求url

```
/refundInfo

```
### 请求参数

|名称|类型|是否必须|示例值|更多限制|描述|
|---|---|---|---|---|---|
|platformId|int|必须|1||平台ID|
|refundId|string|必须|1023655555555||平台退款单ID|

### 响应参数

### 请求示例

``` json

{
"platformId" :2,
"refundId" :20,
}

```
### 响应示例

``` json
{
   "buyerNick" : "",
   "downTime" : "2016-04-13 14:40:07",
   "goodStatus" : "",
   "hasGoodsReturn" : 1,
   "iscsReceiptStatus" : "",
   "modifyTime" : "2016-04-13 14:40:07",
   "orderId" : "10027064534",
   "orderPayment" : 49.50,
   "orderStatus" : "",
   "outerId" : "",
   "platformId" : 10,
   "platformRefundStatus" : "",
   "processStatus" : 10,
   "productName" : "",
   "productNumId" : "",
   "refundCreateTime" : "",
   "refundFee" : 49.50,
   "refundId" : 123456,
   "refundUkid" : 111564100000013003,
   "remark" : "",
   "returnOutSid" : "",
   "returnReason" : "",
   "returnTmsCode" : "20",
   "serviceStatus" : "",
   "shopId" : 10,
   "skuNumId" : "",
   "subOrderId" : "",
   "targetOrderUkid" : 10
}

```
### 错误码解释

## 退款单同步

### 请求url

```
/refreshRefund

```
### 请求参数

|名称|类型|是否必须|示例值|更多限制|描述|
|---|---|---|---|---|---|
|platformId|int|必须|1||平台ID|
|refundId|string|必须|1023655555555||平台退款单ID|

### 响应参数
### 请求示例

``` json

[
   {
      "platformId" : 2,
      "refundId" : 20
   },
   {
      "platformId" : 3,
      "refundId" : 21
   }
]

```
### 响应示例

``` json
{
   "fail" : 2,
   "success" : 3
}

```
### 错误码解释

# 原始订单

|环境|HTTP请求地址|HTTPS请求地址|
|---|---|---|
|正式环境|http://192.168.6.143:8080/originTrade|https://192.168.6.143:8080/originTrade|
|测试环境|http://192.168.6.143:8080/originTrade|https://192.168.6.143:8080/originTrade|

## 列表页

### 请求url

```
/list

```
### 请求参数

```


```
### 响应参数

```


```
### 请求示例

``` json

{
   "currentPage" : 1,
   "filter" : [
      {
         "compare" : "equal",
         "datatype" : "number",
         "field" : "shopId",
         "value" : "10"
      }
   ],
   "pageSize" : 20,
   "sort" : "orderId&asc"
}

```
### 响应示例

``` json
{
   "body" : "",
   "data" : {
      "allNum" : 17,
      "contentList" : [
         {
            "buyerMessage" : "",
            "buyerNick" : "jianglixiao2008@163.com",
            "content" : "",
            "discountFee" : "",
            "downTime" : "2016-04-13 14:40:07",
            "freightFee" : "",
            "isCod" : "",
            "isFullFields" : "",
            "itemList" : "",
            "modifyTime" : "2016-04-13 14:40:07",
            "orderCreateTime" : "2016-04-05 16:00:35",
            "orderId" : "10027064534",
            "orderPayTime" : "",
            "orderPayment" : "",
            "orderSellerFee" : "",
            "orderType" : "",
            "originTradeStatus" : 100,
            "placeOrderStatus" : "",
            "platformId" : "",
            "platformOrderStatus" : "20",
            "receiverAddress" : "",
            "receiverCity" : "宁波市",
            "receiverCounty" : "慈溪市",
            "receiverMobile" : "",
            "receiverName" : "",
            "receiverPhone" : "",
            "receiverState" : "浙江省",
            "receiverZip" : "",
            "releaseDate" : "",
            "releaseTime" : "",
            "sellerMemo" : "",
            "shopId" : 10,
            "sourceOrderId" : "",
            "stockId" : "",
            "storeCode" : "",
            "targetOrderUkid" : "",
            "totalFee" : 49.50,
            "tradeUkid" : 111564100000013003
         }
      ],
      "currentPage" : 2,
      "pageNum" : 2,
      "pageSize" : 1
   },
   "code" : 0,
   "msg" : ""
}

```
### 错误码解释

## 订单收货人信息查询

### 请求url

```
/getRecipientInfo

```
### 请求参数
### 响应参数
### 请求示例
### 响应示例
### 错误码解释

## 订单基本信息查询

### 请求url

```
/getBaseInfo

```
### 请求参数
### 响应参数
### 请求示例

```
  {
    "tradeUkid ": 24
  }

```
### 响应示例

``` json
{
   "body" : "",
   "data" : {
      "baBuyer" : {
         "buyerNick" : "催眠刺",
         "buyerUkid" : "",
         "createDate" : "",
         "createUserId" : "",
         "dateUpdated" : "",
         "isMember" : "",
         "memberIntegral" : 111,
         "memberLevel" : "1",
         "receiverMobile" : "111",
         "userIdUpdated" : ""
      },
      "vOriginTrade" : {
         "buyerMessage" : "",
         "buyerNick" : "催眠刺",
         "content" : "",
         "discountFee" : 83.920,
         "downTime" : "2016-04-14 13:36:35",
         "freightFee" : 0.0,
         "isCod" : "",
         "isFullFields" : 1,
         "itemList" : "",
         "modifyTime" : "2016-04-14 13:36:35",
         "orderCreateTime" : "",
         "orderId" : "BK2015IS-20160414-00181",
         "orderPayTime" : "2016-04-14 12:43:26",
         "orderPayment" : 139.40,
         "orderSellerFee" : 149.40,
         "orderType" : "TRADE",
         "originTradeStatus" : 100,
         "placeOrderStatus" : "",
         "platformId" : 160,
         "platformOrderStatus" : "",
         "receiverAddress" : "中国联合网络通信有限公司自贡分公司四川省自贡市自流井区汇东路50号",
         "receiverCity" : "自贡市",
         "receiverCounty" : "自流井区",
         "receiverMobile" : "18681310712",
         "receiverName" : "曾睿",
         "receiverPhone" : "",
         "receiverState" : "四川省",
         "receiverZip" : "",
         "releaseDate" : "",
         "releaseTime" : "",
         "sellerMemo" : "",
         "shopId" : 250523,
         "sourceOrderId" : "",
         "stockId" : 2,
         "storeCode" : "",
         "targetOrderUkid" : "",
         "totalFee" : 149.40,
         "tradeUkid" : 24
      }
   },
   "code" : 0,
   "msg" : ""
}

```
### 错误码解释




  