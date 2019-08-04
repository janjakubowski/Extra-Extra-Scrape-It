var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
    },
    date: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    },
    source: {
        type: String
    }

});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;