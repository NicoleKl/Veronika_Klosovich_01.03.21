class Film {
    constructor(film) {
        this.id = film.id;
        this.name = film.name;
        this.img = film.img;
        this.description = film.description;
        this.year = film.year;
        this.genres = film.genres;
        this.director = film.director;
        this.starring = film.starring;
    }
}

export { Film }