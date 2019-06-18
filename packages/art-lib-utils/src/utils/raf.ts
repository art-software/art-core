/**
 * requestAnimationFrame polyfill
 */

let prev = Date.now();

function fallback(fn: FrameRequestCallback): number {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const handle = setTimeout(fn, ms);
  prev = curr + ms;
  return handle;
}

const iRaf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || fallback;

const iCancel = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;

export function raf(fn: FrameRequestCallback): number {
  return iRaf.call(window, fn);
}

export function cancel(handle: number): void {
  iCancel.call(window, handle);
}
