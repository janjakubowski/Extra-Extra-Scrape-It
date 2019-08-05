var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    source: {
        type: String
    },
    headline: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }

});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;