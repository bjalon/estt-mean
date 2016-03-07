var db = require('../db');
var Schema = require('mongoose').Schema;

var bookSchema = new Schema({
  id:             { type: String, required: true },
  title:          { type: String, required: true },
  etat:           { type: String, required: true },
  description:    { type: String, required: false },
  authors:        { type: String, required: false },
  periodiqueName: { type: String, required: false },
  parutionDate:   { type: Date,   required: false, default: Date.now }
});

bookSchema.index({ title: 'text', description: 'text', authors: 'text'});

var Book = db.model('Book', bookSchema);

module.exports = Book;