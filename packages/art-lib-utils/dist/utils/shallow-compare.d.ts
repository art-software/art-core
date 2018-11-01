/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
export declare const shallowEqual: (objA: any, objB: any) => boolean;
/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 * See also https://facebook.github.io/react/docs/shallow-compare.html
 */
declare function shallowCompare(instance: any, nextProps: any, nextState: any): boolean;
export default shallowCompare;
