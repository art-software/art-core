/**
 * @module utils/local 封装操作 localStorage 的方法
 * @author bigfact
 */
declare const _default: {
    /**
     * window.localStorage 设置
     * @param {String} [key = ''] 键
     * @param {String} [val = ''] 值
     * @returns {Boolean} 是否设置成功
     */
    set: (key?: string, val?: string) => boolean;
    /**
     * window.localStorage 获取
     * @param {String} [key = ''] 键
     * @returns {String} 对应 key 的值
     */
    get: (key?: string) => string | null;
    /**
     * 清除 window.localStorage，若不填参数 key ，则清除所有 window.localStorage
     * @param {String} key 键
     * @returns {Boolean} 是否清除成功
     */
    remove: (key: any) => boolean;
    /**
     * 检查是否支持 window.localStorage
     * @returns {Boolean} 是否支持本地存储
     */
    support: () => boolean;
};
export default _default;
