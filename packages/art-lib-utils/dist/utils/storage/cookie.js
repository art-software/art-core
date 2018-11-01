/**
 * 检查、获取、设置 cookie
 */
export default {
    /*
     * 获取 cookie 值
     * @param {String} name cookie 名称
     * @returns {String} value cookie 值
     */
    get(name) {
        const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        const arr = document.cookie.match(reg);
        if (arr) {
            return unescape(arr[2]);
        }
        else {
            return '';
        }
    },
    /*
     * 设置 cookie
     * @param {String} name cookie 名称
     * @param {String} value cookie 值
     * @param {String} path cookie 路径
     * @param {Number} cycle cookie 的生命周期
     */
    set(name, value, path, cycle) {
        let expires;
        if (cycle) {
            const maxCycle = new Date();
            maxCycle.setTime(maxCycle.getTime() + cycle * 1000);
            expires = ';expires=' + maxCycle.toUTCString();
        }
        path = path ? ';path=' + path : '';
        document.cookie = name + '=' + escape(value) + expires + path;
    },
    /*
     * 删除 cookie
     * @param {String} name cookie 名称
     * @param {String} path cookie 路径
     */
    remove(name, path) {
        const endCycle = new Date();
        endCycle.setTime(endCycle.getTime() - 1);
        const delValue = this.get(name);
        path = path ? ';path=' + path : '';
        document.cookie = name + '=' + delValue + ';expires=' + endCycle.toUTCString() + path;
    },
    /**
     * 检查是否支持 cookie
     */
    support() {
        return window.navigator.cookieEnabled;
    }
};
