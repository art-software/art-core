"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRuntime = () => {
    const ua = navigator.userAgent;
    return {
        webKit: ua.indexOf('AppleWebKit') > -1,
        ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1,
        weixin: ua.indexOf('MicroMessenger') > -1
    };
};
exports.default = getRuntime();
