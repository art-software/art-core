/* tslint:disable:typedef-whitespace */
export interface IAnimation {
  loop?     : boolean;
  start?    : boolean;
  delay?    : number;
  duration? : number;
  onStep    : (delta: number) => void;
  onDelta   : (progress: number) => number;
  onComplete: () => void;                    // animation complete callback
}

export interface IAnimate {
  delay?    : number;
  duration  : number;
  onStep    : (delta: number) => void;       // The function, which actually does the job. It takes the result of delta and applies it.
  onDelta   : (progress: number) => number;  // 不同的delta结果决定了动画的速度，加速度，通过不同的easing数学函数如(Linea, quad, circ) (the function to calculate animation state at every frame. The functions can be modified by applying easeOut/easeInOut transforms)
  onComplete: () => void;
}