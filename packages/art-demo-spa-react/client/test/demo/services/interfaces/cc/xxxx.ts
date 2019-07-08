
export interface AjaxResult<T> {
    code: number;
    msg: string;
    data: T;
}

export interface IHomeService {
    advertiseDetail(): Promise<AjaxResult<IAdvertiseDetail>>;
}

export interface IBanner1 {
    banner_img: string;
    QQ: string;
}

export interface IRoll1 {
    name: string;
    product: string;
    amount: number;
}

export enum Type1 {
    popularity = 1,
    hot = 2
}

export interface IProducts1 {
    product_name: string;
    product_tag: string;
    product_url: string;
    product_max_money: number;
    minimum_release_time: number;
    product_day_rate: number;
}

export interface IModule1 {
    type: Type1;
    title: string;
    apply_total: number;
    products: IProducts1[];
}

export interface IAdvertiseDetail {
    banner: IBanner1;
    roll: IRoll1[];
    module: IModule1[];
}