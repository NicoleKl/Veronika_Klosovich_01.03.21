import * as webStorage from '../webstorage/webStorage.js'
import * as utils from './markup.js'


class FilmInfo {
    constructor(favouritesPanel, films) {
        this.favouritesPanel = favouritesPanel;
        this.films = films;
    }

    showFilmInfo(filmId) {
        let thisRef = this;

        function inner(event) {
            let film = thisRef.films.get(filmId);
            let container = FilmInfo.infoHtml(film);
            thisRef.fillGenresContainer(container, film);
            container.parentElement.classList.add('is-visible');
            thisRef.addEvents(thisRef, container, film);
        }

        return inner;
    }

    addEvents(thisRef, container, film) {
        utils.clickEvent(container, "modal-star", thisRef.updateFavourites(film.id));
        FilmInfo.closeEvent();
    }

    updateFavourites(filmId) {
        let thisRef = this;
        function inner(event) {
            let mainElement = document.getElementById(filmId);
            utils.updateFavourites(filmId, thisRef.favouritesPanel, [event.target.parentElement, mainElement]);
        }
        return inner;
    }

    static closeEvent(event) {
        document.getElementById('close-btn').addEventListener('click', function (event) {
            document.getElementsByClassName('overlay')[0].classList.remove('is-visible');
        });
    }

    fillGenresContainer(container, film) {
        let genreHtml = (genre) => `<div class="modal-genre"><p>${genre.charAt(0).toUpperCase() + genre.slice(1)}</p></div>`;

        let genresContainer = container.getElementsByClassName('modal-first-column-genres')[0];
        film.genres.forEach(genre => genresContainer.innerHTML += genreHtml(genre));

        return genresContainer;
    }

    static infoHtml(film) {
        let container = document.getElementsByClassName('modal')[0];
        let starring = film.starring.join(", ");
        let starType = webStorage.exists(film.id) ? 'fa-star' : 'fa-star-o';
        container.innerHTML = `<div class="modal-first-column">
                                    <img alt="film-img" class="modal-first-column-image" src=${film.img}>
                                    <div class="modal-first-column-star-year">
                                        <i class="fa ${starType} fa-2x star modal-star" aria-hidden="true"></i>
                                        <p>${film.year}</p>
                                    </div>
                                    <div class="modal-first-column-genres"></div>
                                </div>
                                <div class="modal-second-column">
                                    <p class="modal-second-column-name">${film.name}</p>
                                    <p class="modal-second-column-description">${film.description}</p>
                                    <div class="modal-second-column-director-starring">
                                        <p class="modal-second-column-director">Director: ${film.director}</p>
                                        <p class="modal-second-column-starring">Starring: ${starring}</p>
                                    </div>
                                </div>
                                <button class="modal-close-btn" id="close-btn"><i class="fa fa-times"></i></button>`;

        return container;
    }
}

export {FilmInfo}