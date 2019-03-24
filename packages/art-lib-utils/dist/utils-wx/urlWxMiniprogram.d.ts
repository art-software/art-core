declare global {
    function getCurrentPages(): any;
}
export declare const getCurrentPage: () => any;
export declare const getQueryString: (name: string) => string | undefined;
/**
 * @description parse objet to query string, if we passed parameter key==="" remove "=" sign
 * @param  {object} obj {name:'ssss', password:''}
 * @returns {String} the string converted from query Object.
 */
export declare const toQueryString: (obj: any) => string;
/**
 * @description parseParamToObj("a=1&b=2&a=3") ==> {a: "3", b: "2"}
 * @param  {string} str query string
 * @returns {Object} the object mapping to all query string.
 */
export declare const parseParamToObj: (str: string) => {};
/**
 * add url parameters e.g. http://wwww.domain.com/path/to/you?name=someone&pwd=xxx#/home
 * @param key the param key e.g. `name`
 * @param value the param value of key e.g. `someone`, if null will remove this key
 * @param url the url you want to modified.
 * @return {String}   new url
 */
export declare const appendUrlParameter: (key: string, value: string, url: any) => string;
