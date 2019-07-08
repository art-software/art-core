
export interface AjaxResult<T> {
    code: number;
    msg: string;
    data: T;
}

export interface IHomeService {
    advertiseDetail(): Promise<AjaxResult<IAdvertiseDetail>>;
}

export interface IBanner2 {
    banner_img: string;
    QQ: string;
}

export interface IRoll2 {
    name: string;
    product: string;
    amount: number;
}

export enum Type2 {
    popularity = 1,
    hot = 2
}

export interface IProducts2 {
    product_name: string;
    product_tag: string;
    product_url: string;
    product_max_money: number;
    minimum_release_time: number;
    product_day_rate: number;
}

export interface IModule2 {
    type: Type2;
    title: string;
    apply_total: number;
    products: IProducts2[];
}

export interface IAdvertiseDetail {
    banner: IBanner2;
    roll: IRoll2[];
    module: IModule2[];
}