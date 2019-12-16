const axios = require("axios");
const cheerio = require("cheerio");

async function fetchData (siteUrl) {
    const result = await axios.get(siteUrl);

    return cheerio.load(result.data);
}

module.exports = {
    fetchData: fetchData
}
