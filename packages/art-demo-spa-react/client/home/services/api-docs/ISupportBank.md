1. 获取支持提现的银行列表

#### detail

| 类别 | 详情 |
| --- | --- |
| request-method | POST |
| request-url | /pb/bank/withdraw-support-bank-list |

#### params

| 参数名    | 类型  | 说明     | 示例 | 值选项 | rename |
| --------- | ----- | -------- | ---- | --- | --- |

#### explain

| 参数名           | 类型      | 说明                 | parents     | 示例  | 值选项 | rename |
| --------------- | --------- | ------------------- | ---------  | ---- | ----- | ------ |
| bank_list       | array     | 支持银行卡列表        | data        |       |       |        |
| id              | int       | 银行id               | data.bank_list  |       |        |       |
| bank_name       | string    | 银行名称             | data.bank_list   |       |       |        |
| bank_pic        | string    | 银行标识             | data.bank_list   |       |       |        |

#### example

```json
{
    "msg": "获取用户提现支持银行列表成功",
    "code": 0,
    "data": {
        "bank_list": [{
            "id": 0,
            "bank_name": "中国工商银行",
            "bank_pic": "http://credit-card-1251122539.cossh.myqcloud.com/credit_card/bank/2018-09-06/bank_0001113.png"
        }]
    }
}
```