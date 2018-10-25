function animate(options) {
    const start = new Date().getTime();
    let timeoutId;
    const animating = () => {
        // The time (in ms) passed from the animation start.
        const timeElapsed = new Date().getTime() - start;
        // The fraction of animation time that has already passed, calculated on every frame as timeElapsed/duration. Gradually moves from 0 to 1.
        let progress = timeElapsed / options.duration;
        // Gradually moves from 0 to 1.
        if (progress > 1) {
            progress = 1;
        }
        // Delta(progress) A function, which returns the current animation progress.
        const delta = options.onDelta(progress);
        // The function, which actually does the job. It takes the result of delta and applies it.
        options.onStep(delta);
        if (progress === 1) {
            clearTimeout(timeoutId);
            if (options.onComplete) {
                options.onComplete();
            }
        }
        else {
            timeoutId = setTimeout(animating, options.delay || 16);
        }
    };
    // auto run
    animating();
}
export default animate;
