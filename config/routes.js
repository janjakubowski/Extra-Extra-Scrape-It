// const scrapeCNBC = require("../scripts/scrapeCNBC");
// const scrapeFBN = require("../scripts/scrapeFBN");
// const articleController = require("../controllers/articles");
// const noteController = require("../controllers/notes");
// const express = require("express");
// const router = express.Router();
const mongojs = require("mongojs");
const db = require("../models");


module.exports = function(app) {

    // default home page
    app.get("/", (req, res) => {
        db.Article.find({})
        .then( dbArticle => {
            var handlebarsObject = {
                articles: dbArticle
            };
            console.log(dbArticle.length);
            res.render("index", handlebarsObject);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });
    
    // saved articles page
    app.get("/saved", (req, res) => {
        db.Article.find({ saved: true })
            .then( dbArticle => {
                var handlebarsObject = {
                    articles: dbArticle
                };
                console.log(dbArticle.length);
                res.render("saved", handlebarsObject);
                })
            .catch(function(err) {
            // If an error occurred, send it to the client
                res.json(err);
                });
    });

    // app.post("/articles/:id", function(req, res) {
    app.post("/articles/:id", function(req, res) {
        // saveId = req.params.id;
        db.Article.updateOne( 
            { _id: mongojs.ObjectId(req.params.id)}, 
            {$set: { saved: true }},
            function(error, updated) {
                if (error) {
                    console.log(error);
                    res.send(error);
                  }
                  else {
                    // Otherwise, send the result of our update to the browser
                    console.log(updated);
                    res.send(updated);
                  }
            });
        // res.json(`${saveId} updated`);
    });

    // scrape cnbc.com
    // router.get("/api/fetchCNBC", (req, res) => {
    //     articleController.getCNBC( (error, docs) => {
    //         if (!docs) {
    //             res.json({message: `No new articles found at cnbc.com, try again later`});
    //         } else {
    //             res.json({message: `Added ${docs.insertedCount} new articles`})
    //         }
    //     });
    // });

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

    // populate articles page from database
    // router.get("/api/articles", (req, res) => {
    //     let query = {};     // if user specified which articles use it, otherwise get all
    //     if (req.query.saved) { query = req.query };
    //     articleController.get( query, data => res.json(data) );
    // });

    app.delete("/api/articles/:id", (req, res) => {
        let query = {};
        query._id = req.parms.id;
        articleController.delete( query, (error, data) => res.json(data) );
    });

    app.patch("/api/articles", (req, res) => {
        articleController.update( req.body, (error, data) => res.json(data) );
    });
    
    app.get("/api/notes/:article_id?", (req, res) => {
        let query = {};     // if user specified an existing note use it, otherwise get all
        if (req.parms.article_id) { query._id = req.parms.article_id };
        noteController.get( query, (error, data) => res.json(data) );
    });
    
    app.delete("/api/notes/:id", (req, res) => {
        let query = {};
        query._id = req.parms.id;
        noteController.delete( query, (error, data) => res.json(data) );
    });

    app.post("/api/notes", (req, res) => {
        noteController.save(req.body, data => res.json(data) )
    });
}