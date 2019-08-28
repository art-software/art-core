
export interface AjaxResult<T> {
    code: number;
    msg: string;
    data: T;
}

export interface IIBankListService {
    pbCardList(): Promise<AjaxResult<IPbCardList>>;
}

export enum CardType2 {
    creditCard = 1,
    debitCard = 2
}

export enum IsDefault2 {
    notDefault = 0,
    default = 1
}

export enum BankStatus2 {
    disabled = 0,
    enabled = 1
}

export enum BankType2 {
    creditCard = 0,
    debitCard = 1
}

export interface IBankList2 {
    card_id: string;
    customer_id: string;
    card_num: string;
    card_short_num: string;
    card_type: CardType2;
    is_default: IsDefault2;
    card_pic: string;
    bank_id: string;
    bank_name: string;
    bank_short_name: string;
    bank_code: string;
    bank_status: BankStatus2;
    bank_type: BankType2;
    bank_pic: string;
    bank_desc: string;
    bank_propaganda_pic: string;
    bank_info: string;
    bank_hot_sort: string;
    bank_url: string;
}

export interface IPbCardList {
    bank_list: IBankList2;
}