var lazyLoad = function () {
    var images = document.querySelectorAll('.card-img-top');

    images.forEach(function (image) {
        var imageUrl = $(image).data("src");
        image.src = imageUrl;
        $(image).show();
    });
}

$(window).on("load", lazyLoad);
