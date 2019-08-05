1. 用户银行卡列表获取接口

#### detail

| 类别 | 详情 |
| --- | --- |
| request-method | GET |
| request-url | /pb/card/list |

#### params

| 参数名    | 类型  | 说明     | 示例 | 值选项 | rename |
| --------- | ----- | -------- | ---- | --- | --- |

#### explain

| 参数名           | 类型      | 说明                 | parents | 示例  | 值选项 | rename |
| --------------- | --------- | ------------------- | ------- | ---- | ----- | ------ |
| bank_list       | object    | 银行卡列表           | data | | | |
| card_id| string |  | data.bank_list| | | |
| customer_id| string | 用户ID | data.bank_list| | | |
| card_num| string | 银行卡号 | data.bank_list| | | |
| card_short_num| string | 卡号后四位 | data.bank_list| | | |
| card_type| int | 卡片类型(1信用卡 2储蓄卡) | data.bank_list| 1 | credit_card:1,debit_card:2 | |
| is_default| int | 是否是默认卡片(0不默认 1默认) | data.bank_list| 1 | not_default:0,default:1 | |
| card_pic| string | 卡片图片 | data.bank_list| | | |
| bank_id| string | 银行ID | data.bank_list| | | |
| bank_name| string | 银行全称 | data.bank_list| | | |
| bank_short_name| string | 银行简称 | data.bank_list| | | |
| bank_code| string | 银行代号 | data.bank_list| | | |
| bank_status| int | 银行状态(0禁用 1启用) | data.bank_list| 1 | disabled:0,enabled:1 | |
| bank_type| int | 卡片类型(0信用卡 1储蓄卡) | data.bank_list| 1 | credit_card:0,debit_card:1 | |
| bank_pic| string | 银行图片 | data.bank_list| | | |
| bank_desc| string | 银行描述 | data.bank_list| | | |
| bank_propaganda_pic| string | 银行宣传图片 | data.bank_list| | | |
| bank_info| string | 银行详情 | data.bank_list| | | |
| bank_hot_sort| string | 银行热门排序 | data.bank_list| | | |
| bank_url| string | 办卡银行链接 | data.bank_list| | | |

#### example

```json
{
    "code": 0,
    "msg": "用户卡列表",
    "data":{
           "bank_list": [{
               "card_id": "1",
               "customer_id": "2",
               "card_num": "************0378",
               "card_short_num": "0378",
               "card_type": "2",
               "is_default": "1",
               "bank_id": "17",
               "bank_name": "中国工商银行",
               "bank_short_name": "工行",
               "bank_code": "ICBC",
               "bank_status": "1",
               "bank_type": "1",
               "bank_pic": "http://credit-card-1251122539.cossh.myqcloud.com/credit_card/upload/2018-12-11/20181211/7a68287c861e6d6b4fe39fe836940fe6.png",
               "bank_desc": "",
               "bank_propaganda_pic": "",
               "bank_info": "牛牛银行是啥银行",
               "bank_hot_sort": "12",
               "bank_url": "https://www.baidu.com/"
           },
           {
               "card_id": "2",
               "customer_id": "2",
               "card_num": "************3333",
               "card_short_num": "3333",
               "card_type": "2",
               "is_default": "0",
               "bank_id": "18",
               "bank_name": "中国农业银行",
               "bank_short_name": "农行",
               "bank_code": "ABC",
               "bank_status": "1",
               "bank_type": "1",
               "bank_pic": "http://credit-card-1251122539.cossh.myqcloud.com/credit_card/upload/2018-12-11/20181211/e0dfb0148e9e348d8c8c815c940adead.png",
               "bank_desc": "",
               "bank_propaganda_pic": "",
               "bank_info": "牛牛银行是啥银行",
               "bank_hot_sort": "12",
               "bank_url": "https://www.baidu.com/"
           },
           {
               "card_id": "3",
               "customer_id": "2",
               "card_num": "************9559",
               "card_short_num": "9559",
               "card_type": "2",
               "is_default": "0",
               "bank_id": "18",
               "bank_name": "中国农业银行",
               "bank_short_name": "农行",
               "bank_code": "ABC",
               "bank_status": "1",
               "bank_type": "1",
               "bank_pic": "http://credit-card-1251122539.cossh.myqcloud.com/credit_card/upload/2018-12-11/20181211/e0dfb0148e9e348d8c8c815c940adead.png",
               "bank_desc": "",
               "bank_propaganda_pic": "",
               "bank_info": "牛牛银行是啥银行",
               "bank_hot_sort": "12",
               "bank_url": "https://www.baidu.com/"
           }]
    }
}
```