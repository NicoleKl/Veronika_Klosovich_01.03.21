import {Gallery} from "./modules/markup/gallery.js";
import {FavouritesPanel} from "./modules/markup/favouritesPanel.js";
import * as Client from './modules/client.js';
import * as webStorage from "./modules/webstorage/webStorage.js";

async function load() {
    let films = await Client.getFilmsAsMap();
    let favouriteFilmIds = webStorage.getFilmIds();
    let favouritesPanel = new FavouritesPanel(films);
    let gallery = new Gallery(favouritesPanel, films);
    gallery.create(favouriteFilmIds);
}

load();









