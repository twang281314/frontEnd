#
ims - 原始订单处理中心
将平台的订单下载至原始订单处理中心, 然后将订单进行处理.最后传入oms系统进行处理.

#更新记录## 更新记录

-- -

更新日期 | 更新摘要 | 负责人: -- -- -- -- -- - | : -- -- -- -- -- - | : -- -- --
    2016 - 04 - 26 | 第一次创建文档 | 徐纯
2016 - 04 - 26 | 修改一些细节问题 | 徐纯
2016 - 04 - 26 | 修改一些细节问题 | 徐纯

-- - #Group 原始退款单

## 获取列表[/list]

        ###
        获取列表[POST]

        + Request(application / json)

        {
            "currentPage": 1,
            "pageSize": 20,
            "sort": "orderId&asc",
            "filter": [{
                "filed": "shopId",
                "compare": "equal",
                "value": "100",
                "datatype": "number"
            }]
        }

        + Response 200(application / json)

        {
            "errorCode": 0,
            "errorMsg": "",
            "body": "",
            "data": {
                "pageNum": 2,
                "currentPage": 2,
                "allNum": 17,
                "pageSize": 1,
                "contentList": [{
                    "refundUkid": 111564100000013003,
                    "shopId": 10,
                    "refundId": 123456,
                    "downTime": "2016-04-13 14:40:07",
                    "modifyTime": "2016-04-13 14:40:07",
                    "refundCreateTime": "",
                    "orderId": "10027064534",
                    "subOrderId": "",
                    "productNumId": "",
                    "skuNumId": "",
                    "outerId": "",
                    "hasGoodsReturn": 1,
                    "platformRefundStatus": "",
                    "returnTmsCode": "20",
                    "returnOutSid": "",
                    "returnReason": "",
                    "remark": "",
                    "refundFee": 49.5,
                    "orderPayment": 49.5,
                    "buyerNick": "",
                    "productName": "",
                    "goodStatus": "",
                    "targetOrderUkid": 10,
                    "platformId": 10,
                    "processStatus": 10,
                    "orderStatus": "",
                    "iscsReceiptStatus": "",
                    "serviceStatus": ""
                }]
            }
        }


        ##
        退款单同步[/refreshRefund]

            ###
            退款单同步[POST]

            + Request(application / json)

            {
                "platformId": 2,
                "refundId": 20,
                "refundUkid": 40
            }

            + Response 200(application / json)

            {
                "success": 3,
                "fail": 2
            }


            ##
            退款单详情[/refundInfo]

                ###
                退款单详情[POST]

                + Request(application / json)

                {
                    "platformId": 2,
                    "refundId": 20
                }

                + Response 200(application / json)

                {
                    "refundUkid": 111564100000013003,
                    "shopId": 10,
                    "refundId": 123456,
                    "downTime": "2016-04-13 14:40:07",
                    "modifyTime": "2016-04-13 14:40:07",
                    "refundCreateTime": "",
                    "orderId": "10027064534",
                    "subOrderId": "",
                    "productNumId": "",
                    "skuNumId": "",
                    "outerId": "",
                    "hasGoodsReturn": 1,
                    "platformRefundStatus": "",
                    "returnTmsCode": "20",
                    "returnOutSid": "",
                    "returnReason": "",
                    "remark": "",
                    "refundFee": 49.5,
                    "orderPayment": 49.5,
                    "buyerNick": "",
                    "productName": "",
                    "goodStatus": "",
                    "targetOrderUkid": 10,
                    "platformId": 10,
                    "processStatus": 10,
                    "orderStatus": "",
                    "iscsReceiptStatus": "",
                    "serviceStatus": ""
                }


                #
                Group 原始销售订单

                ## 获取列表[/list]

                    ###
                    获取列表[POST]

                    + Request(application / json)

                    {
                        "currentPage": 1,
                        "pageSize": 20,
                        "sort": "orderId&asc",
                        "filter": [{
                            "field": "shopId",
                            "compare": "equal",
                            "value": "10",
                            "datatype": "number"
                        }]
                    }

                    + Response 200(application / json)

                    {
                        "errorCode": 0,
                        "errorMsg": "",
                        "body": "",
                        "data": {
                            "pageNum": 2,
                            "currentPage": 2,
                            "allNum": 17,
                            "pageSize": 1,
                            "contentList": [{
                                "tradeUkid": 111564100000013003,
                                "sourceOrderId": "",
                                "shopId": 10,
                                "downTime": "2016-04-13 14:40:07",
                                "modifyTime": "2016-04-13 14:40:07",
                                "releaseTime": "",
                                "originTradeStatus": 100,
                                "itemList": "",
                                "orderId": "10027064534",
                                "platformId": "",
                                "stockId": "",
                                "targetOrderUkid": "",
                                "content": "",
                                "storeCode": "",
                                "orderType": "",
                                "platformOrderStatus": "20",
                                "isFullFields": "",
                                "placeOrderStatus": "",
                                "orderCreateTime": "2016-04-05 16:00:35",
                                "orderPayTime": "",
                                "totalFee": 49.5,
                                "orderSellerFee": "",
                                "orderPayment": "",
                                "freightFee": "",
                                "discountFee": "",
                                "buyerNick": "jianglixiao2008@163.com",
                                "receiverName": "",
                                "receiverMobile": "",
                                "receiverPhone": "",
                                "receiverState": "浙江省",
                                "receiverCity": "宁波市",
                                "receiverCounty": "慈溪市",
                                "receiverZip": "",
                                "receiverAddress": "",
                                "isCod": "",
                                "buyerMessage": "",
                                "sellerMemo": "",
                                "releaseDate": ""
                            }]
                        }
                    }


                    ##
                    订单收货人信息查询[/getRecipientInfo]

                        ###
                        订单收货人信息查询[POST]

                        + Request(application / json)

                        {
                            "tradeUkid": 888888
                        }

                        + Response 200(application / json)

                        {
                            "errorCode": 0,
                            "errorMsg": "",
                            "body": "",
                            "data": {
                                "tradeUkid": 24,
                                "sourceOrderId": "",
                                "shopId": "",
                                "downTime": "",
                                "modifyTime": "",
                                "releaseTime": "",
                                "originTradeStatus": "",
                                "itemList": "",
                                "orderId": "",
                                "platformId": "",
                                "stockId": "",
                                "targetOrderUkid": "",
                                "content": "",
                                "storeCode": "",
                                "orderType": "",
                                "platformOrderStatus": "",
                                "isFullFields": "",
                                "placeOrderStatus": "",
                                "orderCreateTime": "",
                                "orderPayTime": "",
                                "totalFee": "",
                                "orderSellerFee": "",
                                "orderPayment": "",
                                "freightFee": "",
                                "discountFee": "",
                                "buyerNick": "",
                                "receiverName": "曾睿",
                                "receiverMobile": "18681310712",
                                "receiverPhone": "",
                                "receiverState": "四川省",
                                "receiverCity": "自贡市",
                                "receiverCounty": "自流井区",
                                "receiverZip": "",
                                "receiverAddress": "中国联合网络通信有限公司自贡分公司四川省自贡市自流井区汇东路50号",
                                "isCod": "",
                                "buyerMessage": "",
                                "sellerMemo": "",
                                "releaseDate": ""
                            }
                        }


                        ##
                        订单基本信息查询[/getBaseInfo]

                            ###
                            订单基本信息查询[POST]

                            + Request(application / json)

                            {
                                "tradeUkid ": 24
                            }

                            + Response 200(application / json)

                            {
                                "errorCode": 0,
                                "errorMsg": "",
                                "body": "",
                                "data": {
                                    "baBuyer": {
                                        "buyerUkid": "",
                                        "buyerNick": "催眠刺",
                                        "receiverMobile": "111",
                                        "isMember": "",
                                        "memberLevel": "1",
                                        "memberIntegral": 111,
                                        "createDate": "",
                                        "createUserId": "",
                                        "dateUpdated": "",
                                        "userIdUpdated": ""
                                    },
                                    "vOriginTrade": {
                                        "tradeUkid": 24,
                                        "sourceOrderId": "",
                                        "shopId": 250523,
                                        "downTime": "2016-04-14 13:36:35",
                                        "modifyTime": "2016-04-14 13:36:35",
                                        "releaseTime": "",
                                        "originTradeStatus": 100,
                                        "itemList": "",
                                        "orderId": "BK2015IS-20160414-00181",
                                        "platformId": 160,
                                        "stockId": 2,
                                        "targetOrderUkid": "",
                                        "content": "",
                                        "storeCode": "",
                                        "orderType": "TRADE",
                                        "platformOrderStatus": "",
                                        "isFullFields": 1,
                                        "placeOrderStatus": "",
                                        "orderCreateTime": "",
                                        "orderPayTime": "2016-04-14 12:43:26",
                                        "totalFee": 149.4,
                                        "orderSellerFee": 149.4,
                                        "orderPayment": 139.4,
                                        "freightFee": 0.0,
                                        "discountFee": 83.92,
                                        "buyerNick": "催眠刺",
                                        "receiverName": "曾睿",
                                        "receiverMobile": "18681310712",
                                        "receiverPhone": "",
                                        "receiverState": "四川省",
                                        "receiverCity": "自贡市",
                                        "receiverCounty": "自流井区",
                                        "receiverZip": "",
                                        "receiverAddress": "中国联合网络通信有限公司自贡分公司四川省自贡市自流井区汇东路50号",
                                        "isCod": "",
                                        "buyerMessage": "",
                                        "sellerMemo": "",
                                        "releaseDate": ""
                                    }
                                }
                            }