export default class UnTouchableService {
    constructor(disableTouchMove?: boolean);
    private disableTouchMove;
    private deltaX;
    private deltaY;
    private pointX;
    private pointY;
    private distX;
    private distY;
    private directionLocked;
    private directionLockThreshold;
    handleTouchStart: (e: any) => void;
    handleTouchMove: (e: any) => void;
    private multiTouchDisable;
    configTouchAction(element: HTMLElement, direction?: string): void;
}
