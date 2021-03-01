import * as webStorage from '../webstorage/webStorage.js'

function clickEvent(parent, className, eventHandler) {
    let element = parent.getElementsByClassName(className)[0];
    element.addEventListener('click', eventHandler);
}

function updateFavourites(filmId, favouritesPanel, allStars = []) {
    if (webStorage.exists(filmId)) {
        webStorage.removeFilm(filmId);
        favouritesPanel.remove(filmId);
        allStars.forEach(dislikeStar);
    } else {
        webStorage.addFilm(filmId);
        favouritesPanel.add(filmId);
        allStars.forEach(likeStar);
    }
}

function likeStar(element) {
    let star = element.getElementsByClassName('fa-star-o')[0];
    star.classList.remove('fa-star-o');
    star.classList.add('fa-star');
}

function dislikeStar(element) {
    let star = element.getElementsByClassName('fa-star')[0];
    star.classList.remove('fa-star');
    star.classList.add('fa-star-o');
}

export {clickEvent, updateFavourites}