const scraping = require('./scraping');
const loadUrl = require('./loadUrl');
const args = require('minimist')(process.argv.slice(2))
// default : UGC Nantes
let cinema = 'P0666';
let day = new Date();
let filtre = {
    specificMovie: null,
    withoutTime: false,
    languageType: null
};

if (args) {
    Object.keys(args).forEach((key) => {
        switch (key) {
            case 'd':
            case 'day':
                day = new Date(args[key]);
                break;
            case 'c':
            case 'cinema':
                cinema = args[key];
                break;
            case 'm':
            case 'movie':
                filtre.specificMovie = args[key];
                break;
            case 'w':
            case 'without-time':
                filtre.withoutTime = true;
                break;
            case 'l':
            case 'language':
                filtre.languageType = args[key];
                break;
        }
    })
}

const siteUrl = `http://www.allocine.fr/seance/salle_gen_csalle=${cinema}.html`;

const start = async () => {
    if (typeof siteUrl !== 'undefined') {
        const $ = await loadUrl.fetchData(siteUrl);
        const movies = await scraping.scrapingData($, filtre);
        return JSON.stringify(movies);
    } else {
        throw new URIError('Url not found');
    }

}

return start()
    .then((movies) => {
        return movies
    })
    .catch((e) => {
        console.log('error rises : ', e.message);
    });
