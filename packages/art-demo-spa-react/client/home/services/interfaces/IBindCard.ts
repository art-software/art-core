
export interface AjaxResult<T> {
    code: number;
    msg: string;
    data: T;
}

export interface IIBindCardService {
    pbCardBind(bankcard: string, name: string, identity: string): Promise<AjaxResult<IPbCardBind>>;
}

export enum CardType1 {
    creditCard = 1,
    debitCard = 2
}

export enum IsDefault1 {
    notDefault = 0,
    default = 1
}

export enum BankStatus1 {
    disabled = 0,
    enabled = 1
}

export enum BankType1 {
    creditCard = 0,
    debitCard = 1
}

export interface IPbCardBind {
    card_id: number;
    customer_id: number;
    card_num: string;
    card_type: CardType1;
    is_default: IsDefault1;
    card_pic: string;
    bank_id: number;
    bank_name: string;
    bank_short_name: string;
    bank_code: string;
    bank_status: BankStatus1;
    bank_type: BankType1;
    bank_pic: string;
    bank_propaganda_pic: string;
    bank_info: string;
    bank_hot_sort: number;
    bank_url: string;
}