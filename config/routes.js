const mongojs = require("mongojs");
const formatDate = require("../scripts/formatDate")
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
        db.Article.findById(req.params.id)
            .then(function(dbArticle){
                var noteId = dbArticle.note;
                return db.Note.findByIdAndRemove(noteId);
            }).then(
                function(){
                    res.json({ "message": "success" })
                })
            .catch(function(err){
                res.json(err);
    })
    });

    // ///////////////////////////////////////////////
    // save a saved article from the collection
    app.post("/saved/:id", (req, res) => {

        
        console.log(`id: ${req.params.id} | body: ${JSON.stringify(req.body)}`);
        let today = formatDate();
        db.Note.create({
            date: today,
            message: req.body.message
        })
        .then( dbNote => {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then( dbArticle => {
            res.json( dbArticle );
        })
        .catch( error => { 
            res.json(error); 
        });
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(item) {
            res.json(item);
        })
        .catch(function(error) {
            res.json(error);
        });
    });


    
}