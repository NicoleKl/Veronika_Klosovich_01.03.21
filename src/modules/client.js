import { Film } from "./domain/film.js";

const filmsUrl = "https://my-json-server.typicode.com/moviedb-tech/movies/list";

function doGet() {
    return fetch(filmsUrl)
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}

async function getFilmsAsMap() {
    let films = await doGet();
    return new Map(films.map(film => [film.id, new Film(film)]));
}

export { getFilmsAsMap }
