export interface AjaxResult<T> {
  code: number;
  message: string;
  data: T;
}

export interface IIndexService {
  getData(): Promise<AjaxResult<IData>>;
}

export interface IData {
  mockData: string;
}