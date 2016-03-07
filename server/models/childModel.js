var db = require('../db');

var Child = db.model('Child', {
  name:      { type: String, required: true },
  level:     { type: String, required: true },
  birthdate: { type: Date, required: true, default: Date.now }
});

module.exports = Child;