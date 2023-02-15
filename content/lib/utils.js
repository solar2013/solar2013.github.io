function fadeOut(target, callback) {
    callback = callback || (() => { });
    const fadeTarget = document.querySelector(target);
    const fadeEffect = setInterval(() => {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity = parseFloat(fadeTarget.style.opacity) - 0.04;
        } else {
            clearInterval(fadeEffect);
            callback();
        }
    }, 15);
}

function fadeIn(target, callback) {
    callback = callback || (() => { });
    const fadeTarget = document.querySelector(target);
    const fadeEffect = setInterval(() => {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 0;
        }
        if (fadeTarget.style.opacity < 1) {
            fadeTarget.style.opacity = parseFloat(fadeTarget.style.opacity) + 0.04;
        } else {
            clearInterval(fadeEffect);
            callback();
        }
    }, 15);
}

function onLoad(callback) {
    document.addEventListener("DOMContentLoaded", callback);
}

Object.defineProperty(Array.prototype, 'chunk', {
    value: function (chunkSize) {
        return [].concat.apply([],
            this.map((elem, i) => {
                return i % chunkSize ? [] : [this.slice(i, i + chunkSize)];
            })
        );
    },
    configurable: true
});