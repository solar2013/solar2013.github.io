window.applySingleAlbumView =
    window.applySingleAlbumView ||
    (() => {
        const hash = document.location.hash;

        if (hash) {
            const elementId = document.location.hash.replace('#', '');
            const targetCard = document.getElementById('#release_' + elementId);
            const allCards = document.querySelectorAll('.card');

            allCards.forEach((card) => {
                if (card == targetCard) {
                    const albumTitle =
                        targetCard.querySelector('.card-title').innerText || '';
                    const cardImage = targetCard.querySelector('.card-image');

                    document.title = 'SOLAR*13 - ' + albumTitle;
                    document.querySelector('#releases-content').className =
                        'center';
                    document.documentElement.classList.add('single-album-view');
                    document.documentElement.style.setProperty(
                        '--single-album-image',
                        `url("${cardImage.src}")`
                    );
                    card.className += ' force-center';

                    return;
                }

                card.querySelector('img').src = '';
                card.remove();
            });
        }
    });
