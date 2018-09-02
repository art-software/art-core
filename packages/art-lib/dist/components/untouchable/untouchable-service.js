import Utils from '../scroll/lib/utils';
export default class UnTouchableService {
    constructor(disableTouchMove = true) {
        this.disableTouchMove = true;
        this.deltaX = 0;
        this.deltaY = 0;
        this.pointX = 0;
        this.pointY = 0;
        this.distX = 0;
        this.distY = 0;
        this.directionLocked = '';
        this.directionLockThreshold = 5;
        this.handleTouchStart = (e) => {
            if (this.multiTouchDisable(e) && e instanceof TouchEvent) {
                const point = e.touches[0];
                this.pointX = point.pageX;
                this.pointY = point.pageY;
                this.distX = 0;
                this.distY = 0;
                this.directionLocked = '';
            }
        };
        this.handleTouchMove = (e) => {
            if (this.multiTouchDisable(e) && e instanceof TouchEvent) {
                const point = e.touches[0];
                this.deltaX = point.pageX - this.pointX;
                this.deltaY = point.pageY - this.pointY;
                this.pointX = point.pageX;
                this.pointY = point.pageY;
                this.distX += this.deltaX;
                this.distY += this.deltaY;
                const absDistX = Math.abs(this.distX);
                const absDistY = Math.abs(this.distY);
                if (!this.directionLocked) {
                    if (absDistX > absDistY + this.directionLockThreshold) {
                        this.directionLocked = 'h'; // lock horizontally
                    }
                    else if (absDistY >= absDistX + this.directionLockThreshold) {
                        this.directionLocked = 'v'; // lock vertically
                    }
                    else {
                        this.directionLocked = 'n'; // no lock
                    }
                }
                // console.log('unTouchable service touch move direction: `', this.directionLocked, '`');
                if (this.directionLocked === 'h') {
                    return;
                }
                if (this.disableTouchMove) {
                    e.preventDefault();
                }
            }
        };
        this.disableTouchMove = disableTouchMove;
    }
    multiTouchDisable(e) {
        if (e.touches.length > 1 || e.targetTouches.length > 1) {
            console.log('multi touch found!');
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
        else {
            return true;
        }
    }
    configTouchAction(element, direction = 'horizontal') {
        if (!element) {
            return;
        }
        // The wrapper should have `touchAction` property for using pointerEvent.
        element.style[Utils.style.touchAction] = Utils.getTouchAction(direction, true);
        // case. not support 'pinch-zoom'
        // https://github.com/cubiq/iscroll/issues/1118#issuecomment-270057583
        if (!element.style[Utils.style.touchAction]) {
            element.style[Utils.style.touchAction] = Utils.getTouchAction(direction, false);
        }
    }
}
