import UnTouchableService from '../../untouchable/untouchable-service';
const touchService = new UnTouchableService();
console.log('register document touchmove events.');
const { handleTouchStart, handleTouchMove } = touchService;
let hasLocked = false;
export const lockTouchEvent = function () {
    if (hasLocked === false) {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        hasLocked = true;
    }
};
export const unlockTouchEvent = function () {
    if (hasLocked === true) {
        document.removeEventListener('touchstart', handleTouchStart, false);
        document.removeEventListener('touchmove', handleTouchMove, false);
        hasLocked = false;
    }
};
