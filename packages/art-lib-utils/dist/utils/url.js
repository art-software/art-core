"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryString = (name, search) => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    if (search && search[0] === '?') {
        search = search.substr(1);
    }
    const r = (search || window.location.search.substr(1)).match(reg);
    if (r !== null) {
        return decodeURIComponent(r[2]);
    }
    return name === 'env' ? 'prod' : null;
};
/**
 * @description parse objet to query string, if we passed parameter key==="" remove "=" sign
 * @param  {object} obj {name:'ssss', password:''}
 * @returns {String} the string converted from query Object.
 */
exports.toQueryString = (obj) => {
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
exports.parseParamToObj = (str) => {
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
exports.appendUrlParameter = (key, value, url) => {
    url = url || window.location.href || '';
    const urlFragmentHash = url.split(/#/)[1] || '';
    const urlFragments = url.replace('#' + urlFragmentHash, '').split('?');
    const urlRoot = urlFragments[0] || '';
    const urlParams = urlFragments[1] || '';
    const params = exports.parseParamToObj(urlParams);
    if (value === null || value === undefined) {
        delete params[key];
    }
    else {
        params[key] = value;
    }
    const finalUrlFragments = [urlRoot];
    const newUrlParamStr = exports.toQueryString(params);
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
