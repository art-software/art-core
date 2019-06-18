export const getCurrentPage = () => {
    // wx miniprogram global method
    const pages = getCurrentPages();
    // get current page object
    return pages.length ? pages[pages.length - 1] : {};
};
export const getQueryString = (name) => {
    const { options } = getCurrentPage();
    return options && options[name] ? decodeURIComponent(options[name]) : undefined;
};
/**
 * @description parse objet to query string, if we passed parameter key==="" remove "=" sign
 * @param  {object} obj {name:'ssss', password:''}
 * @returns {String} the string converted from query Object.
 */
export const toQueryString = (obj) => {
    const parts = [];
    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            const paramValue = encodeURIComponent(obj[i]);
            if (paramValue === '' || paramValue === 'undefined') {
                parts.push(encodeURIComponent(i));
            }
            else {
                parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
            }
        }
    }
    return parts.join('&');
};
/**
 * @description parseParamToObj("a=1&b=2&a=3") ==> {a: "3", b: "2"}
 * @param  {string} str query string
 * @returns {Object} the object mapping to all query string.
 */
export const parseParamToObj = (str) => {
    if (!str) {
        return {};
    }
    return str.split('&').reduce(function interator(params, param) {
        // handle "key=value=string=me";
        const equalIndex = param.indexOf('=');
        let paramsFragments = [];
        if (equalIndex !== -1) {
            paramsFragments = [param.substr(0, equalIndex), param.substr(equalIndex + 1)];
        }
        else {
            paramsFragments = [param];
        }
        const paramSplit = paramsFragments.map((value) => {
            return decodeURIComponent(value.replace('+', ' '));
        });
        params[paramSplit[0]] = paramSplit[1];
        return params;
    }, {});
};
/**
 * add url parameters e.g. http://wwww.domain.com/path/to/you?name=someone&pwd=xxx#/home
 * @param key the param key e.g. `name`
 * @param value the param value of key e.g. `someone`, if null will remove this key
 * @param url the url you want to modified.
 * @return {String}   new url
 */
export const appendUrlParameter = (key, value, url) => {
    url = url || '';
    const urlFragmentHash = url.split(/#/)[1] || '';
    const urlFragments = url.replace('#' + urlFragmentHash, '').split('?');
    const urlRoot = urlFragments[0] || '';
    const urlParams = urlFragments[1] || '';
    const params = parseParamToObj(urlParams);
    if (value === null || value === undefined) {
        delete params[key];
    }
    else {
        params[key] = value;
    }
    const finalUrlFragments = [urlRoot];
    const newUrlParamStr = toQueryString(params);
    if (newUrlParamStr) {
        finalUrlFragments.push('?' + newUrlParamStr);
    }
    if (urlFragmentHash) {
        if (newUrlParamStr) {
            finalUrlFragments.push('#' + urlFragmentHash);
        }
        else {
            finalUrlFragments.push('?#' + urlFragmentHash);
        }
    }
    return finalUrlFragments.join('');
};
/**
 * save current page params and add new params to href
 * @param url what url u want to add params, no this param, will set current page
 * @param saveParamsKey what params do u want to save, like ['env', 'port'], no that parmas will save all
 * @param appendParams what params u want to append, like {name: 'ygm', age: 18}
 * @return {String} new Url
 */
export const setUrlParams = (url = '', saveParamsKey = [], appendParams = {}) => {
    const currentPageData = getCurrentPage();
    let route = url ? url : currentPageData.route;
    // @ts-ignore
    const { options } = currentPageData;
    if (saveParamsKey.length) {
        saveParamsKey.forEach((paramKey) => {
            if (options[paramKey]) {
                const saveParam = {};
                saveParam[paramKey] = options[paramKey];
                Object.assign(appendParams, saveParam);
            }
        });
    }
    else {
        Object.assign(appendParams, options);
    }
    for (const param in appendParams) {
        route = appendUrlParameter(param, appendParams[param], route);
    }
    return route || '';
};
