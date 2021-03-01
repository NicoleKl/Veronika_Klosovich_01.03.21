const favouriteFilmsKey = "favouriteFilms";

function putFilmIds(value) {
    localStorage.setItem(favouriteFilmsKey, JSON.stringify(value));
}

function getFilmIds() {
    return JSON.parse(localStorage.getItem(favouriteFilmsKey)) || [];
}

function exists(filmId) {
    let filmIds = getFilmIds();
    return filmIds.includes(filmId);
}

function removeFilm(filmId) {
    let filmIds = getFilmIds();
    let updated = filmIds.filter(id => id !== filmId);
    putFilmIds(updated);
}

function addFilm(filmId) {
    let filmIds = getFilmIds();
    filmIds.push(filmId);
    putFilmIds(filmIds);
}

export { putFilmIds, getFilmIds, removeFilm, addFilm, exists, favouriteFilmsKey}