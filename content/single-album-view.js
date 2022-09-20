window.applySingleAlbumView = window.applySingleAlbumView || (() => {
    const hash = document.location.hash;

    if (hash) {
        const elementId = document.location.hash.replace('#', '');
        const targetCard = document.getElementById('#release_'+elementId);
        const allCards = document.querySelectorAll('.card');

        allCards.forEach(card => {
            if (card == targetCard){
                const albumTitle = targetCard.querySelector('.card-title').innerText || '';

                document.title = "SOLAR*13 - "+albumTitle;
                document.querySelector("#releases-content").className = "center";
                card.className += " force-center";

                return;
            }

            card.style.display = 'none';
        });
    }
});