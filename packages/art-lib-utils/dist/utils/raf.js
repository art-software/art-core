/**
 * requestAnimationFrame polyfill
 */
let prev = Date.now();
function fallback(fn) {
    const curr = Date.now();
    const ms = Math.max(0, 16 - (curr - prev));
    const handle = setTimeout(fn, ms);
    prev = curr + ms;
    return handle;
}
const iRaf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || fallback;
const iCancel = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
export function raf(fn) {
    return iRaf.call(window, fn);
}
export function cancel(handle) {
    iCancel.call(window, handle);
}
