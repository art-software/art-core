/**
 * @module utils/local 封装操作 localStorage 的方法
 * @author bigfact
 */
export default {
    /**
     * window.localStorage 设置
     * @param {String} [key = ''] 键
     * @param {String} [val = ''] 值
     * @returns {Boolean} 是否设置成功
     */
    set: (key = '', val = '') => {
        try {
            if (!key) {
                return false;
            }
            window.localStorage.setItem(key, val);
            return true;
        }
        catch (err) {
            return false;
        }
    },
    /**
     * window.localStorage 获取
     * @param {String} [key = ''] 键
     * @returns {String} 对应 key 的值
     */
    get: (key = '') => {
        try {
            if (!key) {
                return '';
            }
            return window.localStorage.getItem(key);
        }
        catch (err) {
            return '';
        }
    },
    /**
     * 清除 window.localStorage，若不填参数 key ，则清除所有 window.localStorage
     * @param {String} key 键
     * @returns {Boolean} 是否清除成功
     */
    remove: (key) => {
        try {
            if (typeof key === 'undefined') {
                window.localStorage.clear();
            }
            else {
                window.localStorage.removeItem(key);
            }
            return true;
        }
        catch (err) {
            return false;
        }
    },
    /**
     * 检查是否支持 window.localStorage
     * @returns {Boolean} 是否支持本地存储
     */
    support: () => {
        try {
            window.localStorage.setItem('key', 'value');
            if (window.localStorage.getItem('key') === 'vaule') {
                window.localStorage.removeItem('key');
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }
};
