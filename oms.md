HOST: http://192.168.6.133:8080
# oms - 订单处理中心
  处理网仓的正式订单,对订单进行合并,促销,审核,匹配快递,匹配仓库等一些逻辑动作.

#更新记录
## 更新记录

---

更新日期 | 更新摘要  | 负责人
:----------- | :----------- | :------
 2016-04-26 | 第一次创建文档 | 徐纯
 2016-04-26 | 修改一些细节问题 | 徐纯

---
# 原始退款单

## 获取列表
### 请求url

``` 
/response/operationLog
```

### 请求说明
  |名称|类型|是否必须|示例值|更多限制|描述|
         |---|---|---|---|---|---|
|requset|
|currentPage|int|true|1||第几页|
|pageSize|int|true|20||每页数量|
|sort|int||orderId&asc|只能按一个字段排序|排序字段 asc升序 desc降序|
|filter|string|| [{"filed": "shopId","compare": "equal","value": "100","datatype": "number"}]||查询条件|
|requsetDet|requsetDet|true||明细|


  |名称|类型|是否必须|示例值|更多限制|描述|
         |---|---|---|---|---|---|
|requsetDet|
|currentPage|int|必须|1||第几页|
|pageSize|int|必须|20||每页数量|
|sort|int|否|orderId&asc|只能按一个字段排序|排序字段 asc升序 desc降序|
|filter|string|否| [{"filed": "shopId","compare": "equal","value": "100","datatype": "number"}]||查询条件|


### 请求示例

```
{
	"currentPage":1,
	"pageSize":20,
	"sort":"orderId&asc",
	"filter":[
		{
			"filed":"shopId",
			"compare":"equal",
			"value":"100",
			"datatype":"number"
		}
	]
}

```

### 返回说明
  |名称|类型|是否必须|示例值|更多限制|描述|
         |---|---|---|---|---|---|
|currentPage|int|必须|1||第几页|
|pageSize|int|必须|20||每页数量|
|sort|int|否|orderId&asc|只能按一个字段排序|排序字段 asc升序 desc降序|
|filter|string|否| [{"filed": "shopId","compare": "equal","value": "100","datatype": "number"}]||查询条件|



### 返回示例

```
{
	"errorCode":0,
	"errorMsg":"",
	"body":"",
	"data":{
		"pageNum":2,
		"currentPage":2,
		"allNum":17,
		"pageSize":1,
		"contentList":[
			{
				"refundUkid":111564100000013003,
				"shopId":10,
				"refundId":123456,
				"downTime":"2016-04-13 14:40:07",
				"modifyTime":"2016-04-13 14:40:07",
				"refundCreateTime":"",
				"orderId":"10027064534",
				"subOrderId":"",
				"productNumId":"",
				"skuNumId":"",
				"outerId":"",
				"hasGoodsReturn":1,
				"platformRefundStatus":"",
				"returnTmsCode":"20",
				"returnOutSid":"",
				"returnReason":"",
				"remark":"",
				"refundFee":49.5,
				"orderPayment":49.5,
				"buyerNick":"",
				"productName":"",
				"goodStatus":"",
				"targetOrderUkid":10,
				"platformId":10,
				"processStatus":10,
				"orderStatus":"",
				"iscsReceiptStatus":"",
				"serviceStatus":""
			}
		]
	}
}


```

## 获取列表
### 请求url

``` 
/response/operationLogl
```

### 请求说明
  |名称|类型|是否必须|示例值|更多限制|描述|
         |---|---|---|---|---|---|
|currentPage|int|必须|1||第几页|
|pageSize|int|必须|20||每页数量|
|sort|int|否|orderId&asc|只能按一个字段排序|排序字段 asc升序 desc降序|
|filter|string|否| [{"filed": "shopId","compare": "equal","value": "100","datatype": "number"}]||查询条件|


### 请求示例

```
{
	"currentPage":1,
	"pageSize":20,
	"sort":"orderId&asc",
	"filter":[
		{
			"filed":"shopId",
			"compare":"equal",
			"value":"100",
			"datatype":"number"
		}
	]
}

```

### 返回说明
  |名称|类型|是否必须|示例值|更多限制|描述|
         |---|---|---|---|---|---|
|currentPage|int|必须|1||第几页|
|pageSize|int|必须|20||每页数量|
|sort|int|否|orderId&asc|只能按一个字段排序|排序字段 asc升序 desc降序|
|filter|string|否| [{"filed": "shopId","compare": "equal","value": "100","datatype": "number"}]||查询条件|



### 返回示例

```
{
	"errorCode":0,
	"errorMsg":"",
	"body":"",
	"data":{
		"pageNum":2,
		"currentPage":2,
		"allNum":17,
		"pageSize":1,
		"contentList":[
			{
				"refundUkid":111564100000013003,
				"shopId":10,
				"refundId":123456,
				"downTime":"2016-04-13 14:40:07",
				"modifyTime":"2016-04-13 14:40:07",
				"refundCreateTime":"",
				"orderId":"10027064534",
				"subOrderId":"",
				"productNumId":"",
				"skuNumId":"",
				"outerId":"",
				"hasGoodsReturn":1,
				"platformRefundStatus":"",
				"returnTmsCode":"20",
				"returnOutSid":"",
				"returnReason":"",
				"remark":"",
				"refundFee":49.5,
				"orderPayment":49.5,
				"buyerNick":"",
				"productName":"",
				"goodStatus":"",
				"targetOrderUkid":10,
				"platformId":10,
				"processStatus":10,
				"orderStatus":"",
				"iscsReceiptStatus":"",
				"serviceStatus":""
			}
		]
	}
}


```

