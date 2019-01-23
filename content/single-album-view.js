var singeView = function(){
    var hash = document.location.hash;

    if (hash) {
        var elementId = document.location.hash.replace('#', '');
        var targetCard = document.getElementById('#release_'+elementId);
        var allCards = document.querySelectorAll('.card');

        allCards.forEach(function(card){
            if (card == targetCard)
                return;

            card.style.display = 'none';
        });
    }
}

$(window).on("load", singeView);
