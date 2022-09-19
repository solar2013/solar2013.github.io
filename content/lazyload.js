window.LazyLoadQueue = window.LazyLoadQueue || [];
window.LazyLoadReady = window.LazyLoadReady || true;
window.LazyLoadInterval = window.LazyLoadInterval || setInterval(function(){
    if (!window.LazyLoadReady)
        return;

    var topImage = window.LazyLoadQueue.shift();

    if (topImage){
        var imageUrl = $(topImage).data("src");
        window.LazyLoadReady = false;   
        topImage.onload = () => window.LazyLoadReady = true;
        topImage.src = imageUrl;
    }
}, 100);

var lazyLoad = function () {
    if (document.body.style.display == 'none'){
        setTimeout(lazyLoad, 120);
        return;
    }

    var images = document.querySelectorAll('.card-img-top');

    images.forEach(function (image) {
        window.LazyLoadQueue.push(image);
    });
}

$(window).on("load", lazyLoad);