const scraping = require('./scraping');
const loadUrl = require('./loadUrl');

const getInfo = async (arguments) => {
    const arg = await checkArg(arguments)
    if (arg.cinema !== null) {
        if (typeof arg.siteUrl !== 'undefined') {
            const $ = await loadUrl.fetchData(arg.siteUrl);
            const movies = await scraping.scrapingData($, arg.filtre);
            return JSON.stringify(movies);
        } else {
            throw new Error('Url not found');
        }
    } else {
        throw new Error('Parameter "cinema" or "c" is mandatory to know the targeted cinema');
    }
}

const checkArg = async (arguments) => {

    // Default value
    // ex : UGC Nantes P0666
    let cinema = null;
    let day = new Date();
    let filtre = {
        specificMovie: null,
        withoutTime: false,
        languageType: null
    };

    if (arguments) {
        Object.keys(arguments).forEach((key) => {
            switch (key) {
                case 'd':
                case 'day':
                    day = new Date(arguments[key]);
                    break;
                case 'c':
                case 'cinema':
                    cinema = arguments[key];
                    break;
                case 'm':
                case 'movie':
                    filtre.specificMovie = arguments[key];
                    break;
                case 'w':
                case 'withoutTime':
                    filtre.withoutTime = true;
                    break;
                case 'l':
                case 'language':
                    filtre.languageType = arguments[key];
                    break;
            }
        })
    }

    return {
        cinema: cinema,
        siteUrl: `http://www.allocine.fr/seance/salle_gen_csalle=${cinema}.html`,
        day: day,
        filtre: filtre
    }
}

module.exports = {
    getInfo: getInfo
}
