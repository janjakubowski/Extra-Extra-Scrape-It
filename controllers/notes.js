const formatDate = require("../scripts/formatDate")
const Note = require("../models/Note");

module.exports = {

    get: function(data, callback) {
        Note.find({
            _articleId: data._id
        }, callback);
    },

    save: function(data, callback) {
        let newNote = {
            _articleId: data._id,
            date: foramtDate(),
            message: data.message
        };
        Note.create(newNote, (error, doc) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`note added ${doc}`)
                callback(doc);
            }
        });
    },

    delete: function(item, callback) {
        Note.remove(
            { _id: item._id }, 
            callback);
    }
}