const requestIdleCallback = window.requestIdleCallback ||
    function (cb) {
        const start = Date.now();
        return setTimeout(() => {
            cb({
                didTimeout: false,
                timeRemaining: () => {
                    return Math.max(0, 50 - (Date.now() - start));
                }
            });
        }, 1);
    };
export default requestIdleCallback;
