var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema({
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline",
  },

  noteText: String,
});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;
