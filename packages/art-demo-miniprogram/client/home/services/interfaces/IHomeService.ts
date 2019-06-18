export interface AjaxResult<T> {
  code: string;
  message: string;
  data: T;
}

export interface IHomeService {
  demoGet(): Promise<AjaxResult<IDemoGet>>;
}

/**
 * GET /demo/get
 * @export
 * @interface IDemoGet
 */
export interface IDemoGet {
  name: string;
}