import { getElemHeight, offsetToParentElem, getElemWidth } from 'art-lib-utils/src/utils/dom';

export const belowthefold = function (element, settings) {
  const iScroll = settings.container;
  const offset = offsetToParentElem(element, iScroll.scroller);
  if (!offset) { return; }
  return Math.abs(iScroll.y) + getElemHeight(iScroll.wrapper) <= offset.top - (settings.threshold || 0);
};

export const rightoffold = function (element, settings) {
  const iScroll = settings.container;
  const offset = offsetToParentElem(element, iScroll.scroller);
  if (!offset) { return; }
  return Math.abs(iScroll.x) + getElemWidth(iScroll.wrapper) <= offset.left - (settings.threshold || 0);
};

export const abovethetop = function (element, settings) {
  const iScroll = settings.container;
  const offset = offsetToParentElem(element, iScroll.scroller);
  if (!offset) { return; }
  return Math.abs(iScroll.y) >= offset.top + (settings.threshold || 0) + getElemHeight(element);
};

export const leftofbegin = function (element, settings) {
  const iScroll = settings.container;
  const offset = offsetToParentElem(element, iScroll.scroller);
  if (!offset) { return; }
  return Math.abs(iScroll.x) >= offset.left + (settings.threshold || 0) + getElemWidth(element);
};

export const inviewport = function (element, settings) {
  return !rightoffold(element, settings)
    && !leftofbegin(element, settings)
    && !belowthefold(element, settings)
    && !abovethetop(element, settings);
};