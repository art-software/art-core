/// <reference types="react" />
import IScrollProbe from '../scroll/lib/iscroll-probe';
export interface ISwiper {
    gap: number;
    loop?: boolean;
    children: JSX.Element[];
    swiperHeight: number;
    showSpinner?: boolean;
    autoPlayInterval?: number;
    isTouchStopAutoPlay?: boolean;
    slidesPerView?: number;
    centeredSlides?: boolean;
    gradientBackground?: any[];
    effect?: string;
    initialSlideIndex?: number;
    showPagination?: boolean;
    flowShadow?: boolean;
    flowRotation?: number;
    flowDepth?: number;
    onSwiperChanged?: (currentPage: number) => void;
    onTap?: (currentPage: number, event: React.MouseEvent<HTMLDivElement>) => void;
    getInitScroll?: (scrollProb: IScrollProbe) => void;
    getEffectScroll?: (scrollProb: IScrollProbe) => void;
}
