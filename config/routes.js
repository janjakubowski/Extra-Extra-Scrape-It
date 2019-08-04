const mongojs = require("mongojs");
const db = require("../models");

module.exports = function(app) {

    // ////////////////////////////////////
    // default home page - unsaved articles
    app.get("/", (req, res) => {

        db.Article.find({ saved: false })
        .then( dbArticles => {
            var handlebarsObject = {
                articles: dbArticles
            };
            console.log(dbArticles.length);
            res.render("index", handlebarsObject);
        })
        .catch(function(err) {
          res.json(err);
        });
    });
    
    // ///////////////////
    // saved articles page
    app.get("/saved", (req, res) => {

        db.Article.find({ saved: true })
            .then( dbArticles => {
                var handlebarsObject = {
                    articles: dbArticles
                };
                console.log(dbArticles.length);
                res.render("saved", handlebarsObject);
                })
            .catch(function(err) {
                res.json(err);
            });
    });

    // ///////////////
    // save an article
    app.post("/articles/:id", function(req, res) {
        db.Article.updateOne( 
            { _id: mongojs.ObjectId(req.params.id)}, 
            {$set: { saved: true }},
            function(error, updated) {
                if (error) {
                    console.log(error);
                    res.send(error);
                  }
                  else {
                    console.log(updated);
                    res.send(updated);
                  }
            });
    });

    // ///////////////////////////////////////////////
    // delete all unsaved articles from the collection
    app.delete("/articles/", (req, res) => {
        db.Article.deleteMany({ saved: false }, function (err) {
            if (err) return err;
        });
    });

    // ///////////////////////////////////////////////
    // delete a saved article from the collection
    app.delete("/saved/:id", (req, res) => {

        db.Article.deleteOne({ _id: req.params.id }, function (err) {
            if (err) return err;
        });
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