async function scrapingData($, filtre) {
    const allCardMovie = $('.showtimes-list-holder > .movie-card-theater');

    movies = [];
    allCardMovie.each((index, element1) => {
        let movie = {};
        movie.title = $(element1).find('.meta > .meta-title > .meta-title-link').text();

        if (movie.title === filtre.specificMovie || filtre.specificMovie === null) {
            if (filtre.withoutTime === false) {
                movie.language = [];
            }
            let infoList = $(element1).find('.showtimes-anchor > .showtimes-versions-holder');
            infoList.each((index, element2) => {
                $(element2).find('.showtimes-version').each((index,element3) => {
                    let language = $(element3).find('.text').text().split('En ')[1].slice(0,2);
                    let hourList = $(element3).find('.hours > .showtimes-hour-block > .showtimes-hour-item > .showtimes-hour-item-value');
                    let hour = [];
                    hourList.each((index, element4) => {
                        let time = $(element4).text().split(':');
                        let date = new Date();
                        date.setHours(parseInt(time[0]));
                        date.setMinutes(parseInt(time[1]));
                        hour.push((date.getHours()<10?'0':'') + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes());
                    })
                    if (filtre.withoutTime === false && (filtre.languageType === language || filtre.languageType === null) ) {
                        movie.language.push({type: language, hours: hour});
                    }
                })
            })

            movies.push(movie);
        }
    })
    return movies;
}

module.exports = {
    scrapingData: scrapingData
}
