declare type IAnyObject = Record<string, any>

declare namespace wx {
  /**
   * Construct a type with a set of properties K of type T
   */
  type Record<K extends string, T> = {
    [P in K]: T;
  };
}

/// <reference path="./lib.wx.api.d.ts" />
/// <reference path="./lib.wx.page.d.ts" />
