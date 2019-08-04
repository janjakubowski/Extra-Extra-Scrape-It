
const axios = require("axios");
const cheerio = require("cheerio");

const formatDate = require("../scripts/formatDate")
const db = require("../models");

module.exports = function(app) {

    // scrape cnbc.com
    app.get("/api/fetchCNBC", (req, res) => {

      	axios.get("https://www.cnbc.com/").then(function(response) {

			const $ = cheerio.load(response.data);
			
			// /////////////////////
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
				result.source = "CNBC";

				db.Article.create(result)
				.then(function(dbArticle) {
					// console.log(dbArticle);
				})
				.catch(function(err) {
					console.log(`Oops, ${err}`);
				});
			});
			
			// ///////////////////////////////////////////////////
			// Get the top three headlines after the lead headline
			$("div.HeroLedePlusThreeDeckItem-story").each(function(i, element) {
				let result = {};
				result.headline = $(element)
					.find("a")
					.text();
				result.link = $(element)
					.find("a")
					.attr("href");
				result.date = formatDate();
				result.saved = false;
				result.source = "CNBC";

				db.Article.create(result)
				.then(function(dbArticle) {
					// console.log(dbArticle);
				})
				.catch(function(err) {
					console.log(`Oops, ${err}`);
				});
			});
			
			// //////////////////////////////////////////////////////////////////////////
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
					result.source = "CNBC";

					db.Article.create(result)
					.then(function(dbArticle) {
						// console.log(dbArticle);
					})
					.catch(function(err) {
						console.log(`Oops, ${err}`);
					});
				};
			});
			console.log("done");
			res.json({ success: true });
		});
    });

	// scrape foxbusiness.com
    app.get("/api/fetchFBN", (req, res) => {
		
		axios.get("https://www.foxbusiness.com/").then(function(response) {

			var $ = cheerio.load(response.data);
			
			$("article.article-ct").each(function(i, element) {
				
				let result = {};
			  
			  	result.headline = $(element)
							.find("h3")
							.text();
				result.link =  $(element)
							.find("h3")
							.find("a")
							.attr("href");
							
				// The headline story is an h1 not h3			
				if ( result.headline === ""  &&  !result.link) {
			
					// Headline story 
					result.headline = $(element)
								.find("h1")
								.find("a")
								.text();
					result.link = $(element)
								.find("h1")
								.find("a")
								.attr("href");
				}

				result.link = "https://www.foxbusiness.com" + result.link;

				result.date = formatDate();
				result.saved = false;
				result.source = "FBN";
				
			  // Make an object with data we scraped for this h4 and push it to the results array
				db.Article.create(result)
					.then(function(dbArticle) {
						// console.log(dbArticle);
					})
					.catch(function(err) {
						console.log(`Oops, ${err}`);
					});
			});
		
			console.log("done");
			res.json({ success: true });
		});
	});
};