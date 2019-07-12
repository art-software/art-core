
export interface AjaxResult<T> {
    code: number;
    msg: string;
    data: T;
}

export interface IISupportBankService {
    pbBankWithdrawSupportBankList(): Promise<AjaxResult<IPbBankWithdrawSupportBankList>>;
}

export interface IBankList1 {
    id: number;
    bank_name: string;
    bank_pic: string;
}

export interface IPbBankWithdrawSupportBankList {
    bank_list: IBankList1[];
}