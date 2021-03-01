import * as utils from './markup.js'
import {FilmInfo} from "./filmInfo.js";

const thisContainer = document.getElementById("films-container");

class Gallery {
    constructor(favouritesPanel, films) {
        this.favouritesPanel = favouritesPanel;
        this.films = films;
    }

    create(favouriteFilmIds) {
        this.favouritesPanel.addAll(favouriteFilmIds);
        this.addAll(favouriteFilmIds);
    }


    addAll(favouriteFilmIds) {
        this.films.forEach((film, k, m) => {
            this.add(film, favouriteFilmIds);
        });
    }

    add(film, favouriteFilmIds) {
        let filmElement = Gallery.filmHtml(film, favouriteFilmIds);
        thisContainer.appendChild(filmElement);
        this.addClickEvents(filmElement, film.id);
    }

    addClickEvents(filmElement, filmId) {
        utils.clickEvent(filmElement, "like-star", this.updateFavourites(filmId));
        let filmInfo = new FilmInfo(this.favouritesPanel, this.films);
        utils.clickEvent(filmElement, "film-image", filmInfo.showFilmInfo(filmId));
        utils.clickEvent(filmElement, "film-name", filmInfo.showFilmInfo(filmId));
    }

    static filmHtml(film, favouriteFilmIds) {
        let isFavourite = favouriteFilmIds.includes(film.id);
        let filmElement = document.createElement("div");
        filmElement.classList.add("film");
        filmElement.id = film.id;
        let starType = isFavourite ? "fa-star" : "fa-star-o";
        filmElement.innerHTML = `<i class="fa ${starType} like-star fa-2x star" aria-hidden="true"></i>
                                 <div class="film-image" style="background-image: url('${film.img}')"></div>
                                 <div class='film-name'>${film.name}</div>
                                 <div class="film-year">${film.year}</div>`;
        return filmElement;
    }

    updateFavourites(filmId) {
        let thisRef = this;
        function inner(event) {
            let mainElement = document.getElementById(filmId);
            utils.updateFavourites(filmId, thisRef.favouritesPanel, [mainElement]);
        }
        return inner;
    }
}

export {Gallery}