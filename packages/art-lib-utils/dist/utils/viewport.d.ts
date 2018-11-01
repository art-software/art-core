declare const _default: {
    currScale: number;
    currDpr: number;
    currRem: any;
    /**
     * 转换特定设备分辨率下的缩放值到屏幕设计稿像素对应PX值
     * 如: iphone4 2分辨率下变成320px 转换到视觉稿应该是750px
     * @param d {Number} 屏幕实际像素PX值
     */
    dpiPX2px(d: string | number): string;
    /**
     * 转换屏幕实际像素PX值到特定设备分辨率下的缩放值
     * 如: iphone4 100px在2分辨率下变成50px
     * @param d {Number} 屏幕实际像素PX值
     */
    px2DPIpx(d: string | number): string;
    /**
     * 转换750PX下的视觉稿PX尺寸到REM值
     * 如: iphone4 750px的视觉稿，100px在2分辨率下变成1rem
     * @param d {Number} 视觉稿PX尺寸值
     */
    px2rem(d: number): string;
};
export default _default;
