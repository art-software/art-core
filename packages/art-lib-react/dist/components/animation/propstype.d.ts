export interface IAnimation {
    loop?: boolean;
    start?: boolean;
    delay?: number;
    duration?: number;
    onStep: (delta: number) => void;
    onDelta: (progress: number) => number;
    onComplete: () => void;
}
export interface IAnimate {
    delay?: number;
    duration: number;
    onStep: (delta: number) => void;
    onDelta: (progress: number) => number;
    onComplete: () => void;
}
