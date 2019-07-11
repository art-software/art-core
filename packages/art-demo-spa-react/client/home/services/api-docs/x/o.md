1. 资产首页

#### detail

| 类别 | 详情 |
| --- | --- |
| request-method | GET |
| request-url | /advertise/advertise/detail |

#### params

| 参数名    | 类型  | 说明     | 示例 | 值选项 | rename |
| --------- | ----- | -------- | ---- | --- | --- |

#### explain

| 参数名           | 类型      | 说明                 | parents | 示例  | 值选项 | rename |
| --------------- | --------- | ------------------- | ------- | ---- | ----- | ------ |
| banner          |  object  | 顶部banner配置          | data    |  |  |  |
| banner_img | string | banner地址 | data.banner |  | | |
| QQ | string | 客服qq | data.banner |  | | |
| roll | array | 借款新闻列表 | data |  | | |
| name | string | 借款人姓名 | data.roll |  | | |
| product | string | 借款产品 | data.roll |  | | |
| amount | int | 借款产品 | data.roll |  | | |
| module | array | 借款平台商品列表 | data |  | | |
| type | int | 借款列表类型 | data.module |  | popularity: 1, hot: 2  | |
| title | string | 借款列表名称 | data.module |  |  | |
| apply_total | number | 成功人数 | data.module | | | |
| products | array | 借款列表数据 | data.module |  |  | |
| product_name | string | 借款商品名称 | data.module.products |  |  | |
| product_tag | string | 借款商品标签 | data.module.products |  |  | |
| product_url | string | 借款商品地址 | data.module.products |  |  | |
| product_max_money | int | 借款产品最大金额 | data.module.products |  |  | |
| minimum_release_time | int | 借款产品最快时间 | data.module.products |  |  | |
| product_day_rate | int | 借款产品日利率 | data.module.products |  |  | |




#### example

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "banner": {
            "banner_img": "http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg",
            "QQ": "1234567"
        },
        "roll": [{name: "章鱼先生", product: "贷上钱", amount: 2000}, {name: "章鱼先生", product: "贷上钱1111", amount: 49999}],
        "module": [{
            "type": 1,
            "title": "人气产品",
            "apply_total": 2000,
            "products": [{
                "product_name": "贷上钱",
                "product_tag": "急速放款",
                "product_max_money": 5000.00,
                "minimum_release_time": 50,
                "product_day_rate": 5,
                "product_url": "https://www.baidu.com"
            },{
                "product_name": "贷上钱",
                "product_tag": "急速放款",
                "product_max_money": 5000.00,
                "minimum_release_time": 50,
                "product_day_rate": 5,
                "product_url": "https://www.baidu.com"
            }]
        }, {
            "type": 2,
            "title": "热门推荐",
            "apply_total": 399999,
            "products": [{
                "product_name": "贷上钱",
                "product_tag": "急速放款",
                "product_max_money": 5000.00,
                "minimum_release_time": 50,
                "product_day_rate": 5,
                "product_url": "https://www.baidu.com"
            }, {
                "product_name": "贷上钱",
                "product_tag": "急速放款",
                "product_max_money": 5000.00,
                "minimum_release_time": 50,
                "product_day_rate": 5,
                "product_url": "https://www.baidu.com"
            }]
        }]
    }
}

```