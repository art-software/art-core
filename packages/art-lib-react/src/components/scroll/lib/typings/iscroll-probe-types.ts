export interface IScrollOptions {
  scrollerSelector?: string;
  resizeScrollbars?: boolean;
	bindToWrapper?: boolean;
	indicators?: any;
	snapSpeed?: number;
	keyBindings?: any;
	deceleration?: number;
	originalRefresh?: any;

	x?: number;
	y?: number;
	bounce?: boolean;
	bounceLock?: boolean;
	momentum?: boolean;
	lockDirection?: boolean;
	useTransform?: boolean;
	useTransition?: boolean;
	topOffset?: number;
	checkDOMChanges?: boolean;
	handleClick?: boolean;

	// Scrollbar
	hScrollbar?: boolean;
	vScrollbar?: boolean;
	fixedScrollbar?: boolean;
	hideScrollbar?: boolean;
	fadeScrollbar?: boolean;
	scrollbarClass?: string;

	// Zoom
	zoom?: boolean;
	zoomMin?: number;
	zoomMax?: number;
	doubleTapZoom?: number;
	mouseWheel?: boolean;
	wheelAction?: string;
	snap?: string | boolean | NodeListOf<Element>;
	snapThreshold?: number;

	// New in IScroll 5?
	resizeIndicator?: boolean;
	mouseWheelSpeed?: number;
	startX?: number;
	startY?: number;
	scrollX?: boolean;
	scrollY?: boolean;
	scrollbars?: boolean | string;
	shrinkScrollbars?: string;
	interactiveScrollbars?: boolean;
	releaseScroll?: boolean;
	fadeScrollbars?: boolean;
	directionLockThreshold?: number;

	bounceTime?: number;

	// String or function
	bounceEasing?: string|{ style: string, fn: (k: any) => any };

	preventDefault?: boolean;
	preventDefaultException?: RegExp[]|Object;

	HWCompositing?: boolean;

	freeScroll?: boolean;

	resizePolling?: number;
	tap?: boolean | string;
	click?: boolean;
	invertWheelDirection?: boolean;
	eventPassthrough?: string | boolean;

	// iScroll probe edition
	probeType?: number;

	// Pointer events
	disableMouse?: boolean;
	disablePointer?: boolean;
	disableTouch?: boolean;
}
