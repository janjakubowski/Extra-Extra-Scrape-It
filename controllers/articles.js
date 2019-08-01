
const scrapeCNBC = require("../scripts/scrapeCNBC");
const scrapeFBN = require("../scripts/scrapeFBN");
const Article = require("../models/Article");

module.exports = {
    
    getCNBC: function(callback) {
        scrapeCNBC(articles => {
            articles.array.forEach(element => {
                element.date = today();
                element.saved = false;
            });
            Article.collection.insertMany(articles, {ordered:false}, 
                (error, docs) => callback(error, docs));
        })
    },

    getFBN: function(callback) {
        scrapeFBN(articles => {
            articles.array.forEach(element => {
                element.date = today();
                element.saved = false;
            });
            Article.collection.insertMany(articles, {ordered:false}, 
                (error, docs) => callback(error, docs));
        })
    },

    delete: function(item, callback) {
        Article.remove(item, callback);
    },

    get: function(query, callback) {
        Article.find(query)
            .sort({ _id: -1 })
            .exec(function(error, docs) {
                callback(docs);
            });
    },

    update: function(query, callback) {
        Article.update({ _id: query._id}, {
            $set: query
        }, {}, callback);
    }
};