export interface AjaxResult<T> {
  code: string;
  message: string;
  data: T;
}

export interface IMainService {
  mainTest(): Promise<AjaxResult<IMainTest>>;
}

export interface IMainTest {
  title: string;
}