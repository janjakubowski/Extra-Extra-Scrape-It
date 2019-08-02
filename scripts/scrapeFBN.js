var axios = require("axios");
var cheerio = require("cheerio");

const scrapeFBN = callback => {

  // Making a request via axios for `nhl.com`'s homepage
  axios.get("https://www.foxbusiness.com/").then(function(response) {

    // Load the body of the HTML into cheerio
    var $ = cheerio.load(response.data);
    
    // Empty array to save our scraped data
    var results = [];
    
    // let done = false;
    // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
    $("article.article-ct").each(function(i, element) {
      
      // featured stories 
      var title = $(element)
                    .find("h3")
                    .text();
                    var link =  $(element)
                    .find("h3")
                    .find("a")
                    .attr("href");

      // headline and highlighted stories 
      if ( title === ""  &&  !link) {

        // Headline story 
        title = $(element)
                    .find("h1")
                    .find("a")
                    .text();
        link = $(element)
                    .find("h1")
                    .find("a")
                    .attr("href");
      }

      link = "https://www.foxbusiness.com" + link;
      // Make an object with data we scraped for this h4 and push it to the results array
      results.push({
        title: title,
        link: link
      });
    });

    // After looping through each h4.headline-link, log the results
    callback(results);
});
};

module.exports = scrapeFBN;
