var db = require('../db');
var Schema = require('mongoose').Schema;

var empruntSchema = new Schema({
  child:   { type: String, required: true },
  book:    { type: String, required: true },
  date: { type: Date, required: false, default: Date.now }
});

empruntSchema.index({ child: 'text', book: 'text', '_id': 'text'});

var Emprunt = db.model('Emprunt', empruntSchema);

module.exports = Emprunt;