var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  _articleId: {
      type: Schema.Types.ObjectId,
      ref: "Article"
  },
  date: {
    type: String
  },
  note: {
    type: String
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;