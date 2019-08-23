import { Controller, Post } from 'routing-controllers';

@Controller('/mine')
export default class IBindCardController {
  @Post('/pb/card/bind')
  public pbCardBind() {
    return {
      code: 0,
      msg: '绑定成功|身份证号不是15或者18位|该用户已经绑定过此卡',
      data: { card_id: 11, customer_id: 1, card_num: '6226661600959567', card_type: 2, is_default: 0, card_pic: '', bank_id: 18, bank_name: '中国银行', bank_short_name: '中国银行', bank_code: 'BOC', bank_status: 1, bank_type: 1, bank_pic: 'http://credit-card-1251122539.cossh.myqcloud.com/credit_card/bank/2018-09-11/bank_MHJH.png', bank_propaganda_pic: '', bank_info: '中国银行', bank_hot_sort: 3, bank_url: 'https://www.baidu.com/' }
    };
  }
}