import { Controller, Post } from 'routing-controllers';

@Controller('/home')
export default class ISupportBankController {
  @Post('/pb/bank/withdraw-support-bank-list')
  public pbBankWithdrawSupportBankList() {
    return {
      msg: '获取用户提现支持银行列表成功',
      code: 0,
      data: { bank_list: [{ id: 0, bank_name: '中国工商银行', bank_pic: 'http://credit-card-1251122539.cossh.myqcloud.com/credit_card/bank/2018-09-06/bank_0001113.png' }] }
    };
  }
}