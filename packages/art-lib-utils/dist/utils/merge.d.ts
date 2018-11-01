/**
 *
 * @param deep
 *  deep merge: { person: {name: 'bowen'} } { person: {age: 26} } => { person: {name: 'bowen', age: 26} }
 *  non-deep merge: { person: {name: 'bowen'} } { person: {age: 26} } => { person: {age: 26} }
 * @param target
 * @param source
 */
declare const merge: (deep?: boolean, target?: object, ...source: (object | null | undefined)[]) => any;
export default merge;
