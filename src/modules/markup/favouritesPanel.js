import * as utils from './markup.js'
import {FilmInfo} from "./filmInfo.js";

const thisContainer = document.getElementById("favorite-list-container");

class FavouritesPanel {
    constructor(films) {
        this.films = films;
        this.items = new Map();
    }

    remove(filmId) {
        let item = this.items.get(filmId);
        item.remove();
        this.items.delete(filmId);
    }

    add(filmId) {
        let item = new FavouriteItem(this.films.get(filmId));
        item.add();
        item.addRemoveEvent(this.removeFromFavourite(filmId));
        item.addInfoEvent(this.showInfo(filmId));
        this.items.set(filmId, item);
    }

    addAll(filmIds) {
        filmIds.forEach(filmId => {
            this.add(filmId);
        });
    }

    showInfo(filmId) {
        let filmInfo = new FilmInfo(this, this.films);
        return filmInfo.showFilmInfo(filmId);
    }

    removeFromFavourite(filmId) {
        let thisRef = this;
        function inner(event) {
            let mainElement = document.getElementById(filmId);
            utils.updateFavourites(filmId, thisRef, [mainElement]);
        }
        return inner;
    }
}

class FavouriteItem {
    constructor(film) {
        this.film = film;
    }

    remove() {
        if (this.div) {
            thisContainer.removeChild(this.div);
        }
    }

    add() {
        this.div = this.itemHtml();
        thisContainer.appendChild(this.div);
    }

    addRemoveEvent(event) {
        utils.clickEvent(this.div, "fa-times", event);
    }

    addInfoEvent(event) {
        utils.clickEvent(this.div, "favourite-film-name", event);
    }

    itemHtml() {
        let div = document.createElement("div");
        div.classList.add("favourite-film");
        div.innerHTML = `<i class="fa fa-arrow-right" aria-hidden="true"></i>
                         <p class="favourite-film-name">${this.film.name}</p>
                         <i class="fa fa-times" aria-hidden="true"></i>`;

        return div;
    }
}

export { FavouritesPanel }