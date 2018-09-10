export interface AjaxResult<T> {
  code: string;
  message: string;
  data: T;
}

export interface IMainPageService {
  getData(): Promise<AjaxResult<IData>>;
}

export interface IData {
  mockData: string;
}