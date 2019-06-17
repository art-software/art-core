export interface IQuickLink {
  prfetchHref: string[];
  priority?: boolean;
  urls?: string[];
  el?: Element;
  origins?: string[] | boolean;
  ignores?: any[]|RegExp|Function; // only working when no observerSelector specified
  timeout?: number;
  timeoutFn?: Function;
  observerSelector?: string;
}
