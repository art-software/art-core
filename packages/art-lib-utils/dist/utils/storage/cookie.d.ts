declare const _default: {
    get(name: string): string;
    set(name: string, value: string, path: string, cycle: number): void;
    remove(name: string, path: string): void;
    /**
     * 检查是否支持 cookie
     */
    support(): boolean;
};
/**
 * 检查、获取、设置 cookie
 */
export default _default;
