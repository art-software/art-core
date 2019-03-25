declare namespace wx {
  /**
   * Construct a type with a set of properties K of type T
   */
  type Record<K extends string, T> = {
    [P in K]: T;
  };
}

declare type IAnyObject = Record<string, any>