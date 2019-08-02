var cheerio = require("cheerio");
var axios = require("axios");

const scrapeCNBC = callback => {
  console.log("scrape called");
  
  // Making a request via axios for `cnbc.com`'s homepage
  axios.get("https://www.cnbc.com/").then(function(response) {
  
    const $ = cheerio.load(response.data);
    let results = [];
    
    // get the lead headline
    $("div.HeroLedePlusThreeLeadItem-content").each(function(i, element) {
      var headline = $(element)
                    .find("h2")
                    .text();
      var link = $(element)
                    .find("h2")
                    .find("a")
                    .attr("href");
      results.push({
        headline: headline,
        link: link
      });
    });
  
    // Get the top three headlines after the lead headline
    $("div.HeroLedePlusThreeDeckItem-descriptionContainer").each(function(i, element) {
      var headline = $(element)
                    .find("a")
                    .text();
      var link = $(element)
                    .find("a")
                    .attr("href");
      results.push({
        headline: headline,
        link: link
      });
    });
  
    // Get more headlines, the next 15 stories appear above the "MARKETS" section 
    $("div.Card-titleContainer").each(function(i, element) {
      if ( i < 15) {
        var headline = $(element)
                      .find("div")
                      .text();
        var link = $(element)
                      .find("a")
                      .attr("href");
        results.push({
          headline: headline,
          link: link
        });
      };
    });
  
    console.log(results);
    callback(results);
  });
};

module.exports = scrapeCNBC;
