var applySingleAlbumView = function(){
    var hash = document.location.hash;

    if (hash) {
        var elementId = document.location.hash.replace('#', '');
        var targetCard = document.getElementById('#release_'+elementId);
        var allCards = document.querySelectorAll('.card');

        allCards.forEach(function(card){
            if (card == targetCard){
                var albumTitle = targetCard.querySelector('.card-title').innerText || '';

                document.title = "SOLAR*13 - "+albumTitle;
                document.querySelector("#releases-content").className = "center";

                return;
            }

            card.style.display = 'none';
        });
    }
}