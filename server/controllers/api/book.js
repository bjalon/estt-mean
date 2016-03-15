var Book = require('../../models/bookModel.js');
var router = require('express').Router();

router.get('/', function(req, res, next) {

    var filter;

    console.log('New GET on book with parameter' + JSON.stringify(req.query));

    if (typeof req.query.fulltext === 'undefined') {
        filter = {};
    } else {
        filter = { $or: [{ 'title': new RegExp('.*' + req.query.fulltext + '.*', 'i') }, 
                         { 'description': new RegExp('.*' + req.query.fulltext + '.*', 'i') },
                         { 'author': new RegExp('.*' + req.query.fulltext + '.*', 'i') },
                         { 'periodiqueName': new RegExp('.*' + req.query.fulltext + '.*', 'i') },
                         { $text : { $search : req.query.fulltext }}
                         ] };
    }

    console.log('Filter detected ' + JSON.stringify(filter));

    Book.find(filter).sort('-date').exec(function(err, books) {
        if (err) {
            console.log('Error during fetch: ' + err);
            return next(err)
        }
        console.log('Book returned: ' + JSON.stringify(books));
        res.status(201).json(books);
    });

});

router.post('/', function(req, res, next) {
    console.log('New POST on book');
    console.log('Book to add ' + JSON.stringify(req.body));
    var book = new Book(req.body)

    book.save(function(err, book) {
        if (err) {
            console.log('Error during addition: ' + err);
            return next(err)
        }
        console.log('Book added');
        res.json(204).json(book);
    })
})



module.exports = router;