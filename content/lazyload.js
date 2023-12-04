window.LazyLoadQueue = window.LazyLoadQueue || [];
window.LazyLoadInterval = window.LazyLoadInterval || setInterval(() => {
    const topImage = window.LazyLoadQueue.shift();

    if (topImage && topImage.parentElement.style.display != 'none'){
        var imageUrl = topImage.dataset["src"];
        topImage.src = imageUrl;
    }
}, 0);

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

onLoad(window.LazyLoadInitializer);