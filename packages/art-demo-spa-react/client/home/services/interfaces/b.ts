
export interface AjaxResult<T> {
    code: number;
    msg: string;
    data: T;
}

export interface IHomeService {
    advertiseDetail(): Promise<AjaxResult<IAdvertiseDetail>>;
}

export interface AjaxResult<T> {
    code: number;
    msg: string;
    data: T;
}

export interface IHomeService {
    advertiseDetail(): Promise<AjaxResult<IAdvertiseDetail>>;
}

export interface IBanner {
    banner_img: string;
    QQ: string;
}

export interface IRoll {
    name: string;
    product: string;
    amount: number;
}

export enum Type {
    popularity = 1,
    hot = 2
}

export interface IProducts {
    product_name: string;
    product_tag: string;
    product_url: string;
    product_max_money: number;
    minimum_release_time: number;
    product_day_rate: number;
}

export interface IModule {
    type: Type;
    title: string;
    apply_total: number;
    products: IProducts[];
}

export interface IAdvertiseDetail {
    banner: IBanner;
    roll: IRoll[];
    module: IModule[];
}