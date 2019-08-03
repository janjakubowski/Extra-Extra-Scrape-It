
const axios = require("axios");
const cheerio = require("cheerio");

const formatDate = require("../scripts/formatDate")
const db = require("../models");


module.exports = router => {

    // scrape cnbc.com
    router.get("/api/fetchCNBC", (req, res) => {

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
						console.log(`Oops, ${err}`);
					});
			});
				
			// Get the top three headlines after the lead headline
			$("div.HeroLedePlusThreeDeckItem-story").each(function(i, element) {
				let result = {};
				result.headline = $(element)
					.find("a")
					.text();
				result.link = $(element)
					.find("a")
					.attr("href");
				// result.imgsrc = $(element)
				// 	.find("img")
				// 	.attr("src");
				result.date = formatDate();
				result.saved = false;
				db.Article.create(result)
					.then(function(dbArticle) {
						// View the added result in the console
						console.log(dbArticle);
					})
					.catch(function(err) {
						// If an error occurred, log it
						console.log(`Oops, ${err}`);
					});
			});

			// Get more headlines, the next 15 stories appear above the "MARKETS" section 
			$("div.Card-titleContainer").each(function(i, element) {
			  if ( i < 15) {
				let result = {};
			    result.headline = $(element)
			                  .find("div")
			                  .text();
			    result.link = $(element)
			                  .find("a")
			                  .attr("href");
				result.date = formatDate();
				result.saved = false;
				console.log(`i: ${i} | result: ${result}`);
				db.Article.create(result)
					.then(function(dbArticle) {
						// View the added result in the console
						console.log(dbArticle);
					})
					.catch(function(err) {
						// If an error occurred, log it
						console.log(`Oops, ${err}`);
					});
			  };
			});
			res.json({ message: "scrape complete"});
			// res.send("Scrape complete");
		});
    });


    // scrape foxbuiness.com
    // router.get("/api/fetchFBN", (req, res) => {
    //     articleController.fetchFBN( (error, docs) => {
    //         if (!docs) {
    //             res.json({message: `No articles found at foxbusiness.com, try again later`});
    //         } else {
    //             res.json({message: `Added ${docs.insertedCount} new articles`})
    //         }
    //     });
    // });

    
}