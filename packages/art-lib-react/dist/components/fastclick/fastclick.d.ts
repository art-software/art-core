/// <reference types="react" />
import CoreComponent from '../../core/CoreComponent';
export default class FastClick extends CoreComponent<any, any> {
    static defaultProps: {
        threshold: number;
        timeThreshold: number;
    };
    state: {
        touchId: null;
        touchX: null;
        touchY: null;
        touchTime: null;
    };
    /**
     * We only re-render if the props have changed-the state changes in this component do not affect the rendered html
     * @param nextProps
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps: any): boolean;
    /**
     * Clear all touch data
     * @param callback
     */
    clearTouchData(callback?: any): void;
    /**
     * Handle the touch start event
     * @param e
     */
    handleTouchStart: (e: any) => void;
    /**
     * Handle the touch move event
     * @param e
     */
    handleTouchMove: (e: any) => void;
    calculateTouchDistanceFromOrigin(touch: any): number;
    handleTouchEnd: (e: any) => void;
    handleTouchCancel: (e: any) => void;
    render(): JSX.Element;
}
