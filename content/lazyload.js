window.LazyLoadQueue = window.LazyLoadQueue || [];
window.LazyLoadReady = window.LazyLoadReady || true;
window.LazyLoadInterval = window.LazyLoadInterval || setInterval(() => {
    if (!window.LazyLoadReady)
        return;

    const topImage = window.LazyLoadQueue.shift();

    if (topImage && topImage.parentElement.style.display != 'none'){
        var imageUrl = $(topImage).data("src");
        window.LazyLoadReady = false;   
        topImage.onload = () => window.LazyLoadReady = true;
        topImage.src = imageUrl;
    }
}, 100);

window.LazyLoadInitializer = window.LazyLoadInitializer || (() => {
    if (document.body.style.display == 'none'){
        setTimeout(window.LazyLoadInitializer, 120);
        return;
    }

    const images = document.querySelectorAll('.card-img-top');

    images.forEach(image => {
        window.LazyLoadQueue.push(image);
    });
});

$(window).on("load", window.LazyLoadInitializer);