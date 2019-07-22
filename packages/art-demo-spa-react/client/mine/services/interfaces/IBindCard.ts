
export interface AjaxResult<T> {
    code: number;
    msg: string;
    data: T;
}

export interface IIBindCardService {
    pbCardBind(bankcard: string, name: string, identity: string): Promise<AjaxResult<IPbCardBind>>;
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

export interface IPbCardBind {
    card_id: number;
    customer_id: number;
    card_num: string;
    card_type: CardType2;
    is_default: IsDefault2;
    card_pic: string;
    bank_id: number;
    bank_name: string;
    bank_short_name: string;
    bank_code: string;
    bank_status: BankStatus2;
    bank_type: BankType2;
    bank_pic: string;
    bank_propaganda_pic: string;
    bank_info: string;
    bank_hot_sort: number;
    bank_url: string;
}