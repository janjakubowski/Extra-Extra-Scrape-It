var cheerio = require("cheerio");
var axios = require("axios");

const scrapeCNBC = callback => {
  
  // Making a request via axios for `cnbc.com`'s homepage
  axios.get("https://www.cnbc.com/").then(function(response) {
  
    const $ = cheerio.load(response.data);
    
    let results = [];
    
    $("div.HeroLedePlusThreeLeadItem-content").each(function(i, element) {
      
      var title = $(element)
                    .find("h2")
                    .text();
      var link = $(element)
                    .find("h2")
                    .find("a")
                    .attr("href");
                    
      results.push({
        title: title,
        link: link
      });
    });
  
  
    $("div.HeroLedePlusThreeDeckItem-descriptionContainer").each(function(i, element) {
      
      // featured stories 
      var title = $(element)
                    .find("a")
                    .text();
      var link = $(element)
                    .find("a")
                    .attr("href");
  
      results.push({
        title: title,
        link: link
      });
    });
  
    
    $("div.Card-titleContainer").each(function(i, element) {
  
  
      // The top 15 stories appear above the "MARKETS" section 
      if ( i < 15) {
  
        var title = $(element)
                      .find("div")
                      .text();
        var link = $(element)
                      .find("a")
                      .attr("href");
  
        results.push({
          title: title,
          link: link
        });
      console.log(`i: ${i}, title: ${title}`)
    };
    });
  
    // After looping through each h4.headline-link, log the results
    console.log(results);
  });
}
