var cheerio = require("cheerio");
var axios = require("axios");

const formatDate = require("./formatDate")
var db = require("../models");

const scrapeCNBC = (req, res) => {
  
  // Making a request via axios for `cnbc.com`'s homepage
  axios.get("https://www.cnbc.com/").then(function(response) {
  
    const $ = cheerio.load(response.data);
    
    // get the lead headline
    $("div.HeroLedePlusThreeLeadItem-content").each(function(i, element) {
      let result = {};

      result.headline = $(element)
                    .find("h2")
                    .text();
      result.link = $(element)
                    .find("h2")
                    .find("a")
                    .attr("href");
      result.date = formatDate();
      result.saved = false;
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
      });
    });
  
    // Get the top three headlines after the lead headline
    // $("div.HeroLedePlusThreeDeckItem-descriptionContainer").each(function(i, element) {
    //   var headline = $(element)
    //                 .find("a")
    //                 .text();
    //   var link = $(element)
    //                 .find("a")
    //                 .attr("href");
    //   results.push({
    //     headline: headline,
    //     link: link
    //   });
    // });
  
    // // Get more headlines, the next 15 stories appear above the "MARKETS" section 
    // $("div.Card-titleContainer").each(function(i, element) {
    //   if ( i < 15) {
    //     var headline = $(element)
    //                   .find("div")
    //                   .text();
    //     var link = $(element)
    //                   .find("a")
    //                   .attr("href");
    //     results.push({
    //       headline: headline,
    //       link: link
    //     });
    //   };
    // });
  
    res.send("Scrape Complete");
    // console.log("scrape complete")
    // callback(results);
  // });
};

module.exports = scrapeCNBC;
