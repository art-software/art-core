/* tslint:disable:typedef-whitespace */
export interface INewsTicker {
  itemSource      : any[];
  itemHeight      : number;
  duration?       : number;
  timePeriod?     : number;
  itemsOneRolling?: number;
  easing?         : (delta: number) => number;
  onItemCmpGet    : (itemData: any) => JSX.Element;
}