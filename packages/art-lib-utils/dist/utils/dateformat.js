"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dateNormalize(date) {
    if (!date) {
        date = new Date();
    }
    let final;
    const dateType = Object.prototype.toString.call(date);
    switch (dateType) {
        case '[object Date]':
            final = date;
            break;
        case '[object String]':
            // IOS format fix. '2016-11-11' 需要转换成2016/11/11
            final = new Date(date.replace(/-/ig, '/'));
            break;
        default:
            final = new Date(date);
    }
    return final;
}
function Appendzero(obj) {
    if (obj < 10) {
        return '0' + '' + obj;
    }
    else {
        return obj;
    }
}
/**
 * YYYY：4位年,如1993
 * YY：2位年,如93
 * MM：月份
 * DD：日期
 * hh：小时
 * mm：分钟
 * ss：秒钟
 * 星期：星期, 返回如 星期二
 * 周：返回如 周二
 * week：英文星期全称, 返回如 Saturday
 * www：三位英文星期, 返回如 Sat
 * @param  {Date|String|Number} date   The Date instance(optional)
 * @param  {String}      format Date format string. YYYY-MM-DD
 * @return {String}             Formatted string.
 */
exports.formatDate = function (date, format) {
    if (!date) {
        return date;
    }
    if (arguments.length < 2 && !date.getTime) {
        format = date;
        date = new Date();
    }
    else {
        date = dateNormalize(date);
    }
    if (typeof format !== 'string') {
        format = 'YYYY年MM月DD日 hh时mm分ss秒';
    }
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
    return format.replace(/YYYY|YY|MM|M|DD|hh|mm|ss|星期|周|www|week/g, function (a) {
        switch (a) {
            case 'YYYY':
                return date.getFullYear();
            case 'YY':
                return (date.getFullYear() + '').slice(2);
            case 'MM':
                return Appendzero(date.getMonth() + 1);
            case 'M':
                return date.getMonth() + 1;
            case 'DD':
                return Appendzero(date.getDate());
            case 'hh':
                return Appendzero(date.getHours());
            case 'mm':
                return Appendzero(date.getMinutes());
            case 'ss':
                return Appendzero(date.getSeconds());
            case '星期':
                return '星期' + week[date.getDay() + 7];
            case '周':
                return '周' + week[date.getDay() + 7];
            case 'week':
                return week[date.getDay()];
            case 'www':
                return week[date.getDay()].slice(0, 3);
        }
    });
};
/**
 * 日期的加减法
 *
 * @param {String} interval 字符串表达式，表示要添加的时间间隔.
 * @param {Number} number 数值表达式，表示要添加的时间间隔的个数.
 * @param {Date} date 时间对象.
 * @return {Date} 新的时间对象.
 */
exports.dateAdd = (interval, number, date) => {
    interval = (interval || '').replace(/\s+/ig, '');
    date = dateNormalize(date);
    switch (interval) {
        case 'y':
            date.setFullYear(date.getFullYear() + number);
            return date;
        case 'q':
            date.setMonth(date.getMonth() + number * 3);
            return date;
        case 'm':
            date.setMonth(date.getMonth() + number);
            return date;
        case 'w':
            date.setDate(date.getDate() + number * 7);
            return date;
        case 'd':
            date.setDate(date.getDate() + number);
            return date;
        case 'h':
            date.setHours(date.getHours() + number);
            return date;
        case 'mi':
            date.setMinutes(date.getMinutes() + number);
            return date;
        case 's':
            date.setSeconds(date.getSeconds() + number);
            return date;
        default:
            date.setDate(date.getDate() + number);
            return date;
    }
};
/**
 * 计算还剩余多少时间 Note. format(hh时mm分ss秒)is required.
 * @param {Number|String} seconds 20000
 * @param {String} format YYYY年MM月DD日 hh时mm分ss秒
 * @param {String} prefix 剩余
 * @returns {String} 剩余23时58分
 */
exports.formatTimestamp = (seconds, format, prefix) => {
    prefix = prefix || '';
    seconds = parseInt(seconds, 10);
    format = format || 'YYYY年MM月DD日 hh时mm分ss秒';
    const orginalDate = new Date('2000/01/01');
    const originalDataTick = orginalDate.getTime();
    const originalFormatedDate = exports.formatDate(orginalDate, format);
    const newDate = originalDataTick + seconds;
    const newFormatedDate = exports.formatDate(new Date(newDate), format);
    const newChars = newFormatedDate.split('');
    const oldChars = originalFormatedDate.split('');
    let diff;
    for (let i = 0; i < newChars.length; i++) {
        if (oldChars[i] !== newChars[i]) {
            diff = newFormatedDate.substr(i);
            break;
        }
    }
    return diff ? prefix + diff : diff;
};
