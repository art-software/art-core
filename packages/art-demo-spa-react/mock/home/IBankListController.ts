import { Controller, Get } from 'routing-controllers';

@Controller('/home')
export default class IBankListController {
  @Get('/pb/card/list')
  public pbCardList() {
    return {
      code: 0,
      msg: '用户卡列表',
      data: { bank_list: [{ card_id: '1', customer_id: '2', card_num: '************0378', card_short_num: '0378', card_type: '2', is_default: '1', bank_id: '17', bank_name: '中国工商银行', bank_short_name: '工行', bank_code: 'ICBC', bank_status: '1', bank_type: '1', bank_pic: 'http://credit-card-1251122539.cossh.myqcloud.com/credit_card/upload/2018-12-11/20181211/7a68287c861e6d6b4fe39fe836940fe6.png', bank_desc: '', bank_propaganda_pic: '', bank_info: '牛牛银行是啥银行', bank_hot_sort: '12', bank_url: 'https://www.baidu.com/' }, { card_id: '2', customer_id: '2', card_num: '************3333', card_short_num: '3333', card_type: '2', is_default: '0', bank_id: '18', bank_name: '中国农业银行', bank_short_name: '农行', bank_code: 'ABC', bank_status: '1', bank_type: '1', bank_pic: 'http://credit-card-1251122539.cossh.myqcloud.com/credit_card/upload/2018-12-11/20181211/e0dfb0148e9e348d8c8c815c940adead.png', bank_desc: '', bank_propaganda_pic: '', bank_info: '牛牛银行是啥银行', bank_hot_sort: '12', bank_url: 'https://www.baidu.com/' }, { card_id: '3', customer_id: '2', card_num: '************9559', card_short_num: '9559', card_type: '2', is_default: '0', bank_id: '18', bank_name: '中国农业银行', bank_short_name: '农行', bank_code: 'ABC', bank_status: '1', bank_type: '1', bank_pic: 'http://credit-card-1251122539.cossh.myqcloud.com/credit_card/upload/2018-12-11/20181211/e0dfb0148e9e348d8c8c815c940adead.png', bank_desc: '', bank_propaganda_pic: '', bank_info: '牛牛银行是啥银行', bank_hot_sort: '12', bank_url: 'https://www.baidu.com/' }] }
    };
  }
}