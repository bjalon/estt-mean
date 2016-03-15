var Emprunt = require('../../models/empruntModel.js');
var router = require('express').Router();

router.get('/', function(req, res, next) {

    var filter;

    console.log('New GET on emprunt with parameter: ' + JSON.stringify(req.query));

    if (typeof req.query.fulltext === 'undefined') {
        filter = {};
    } else {
        filter = { $or: [{ 'book': new RegExp('.*' + req.query.fulltext + '.*', 'i') }, { 'child': new RegExp('.*' + req.query.fulltext + '.*', 'i') }] };
    }

    console.log('Filter detected ' + JSON.stringify(filter));

    Emprunt.find(filter).sort('-date').exec(function(err, emprunts) {
        if (err) {
            console.log('Error during fetch: ' + err);
            return next(err)
        }
        console.log('Emprunt returned: ' + JSON.stringify(emprunts));
        res.status(201).json(emprunts);
    });

});


router.post('/', function(req, res, next) {
    console.log('New POST on emprunt');
    var empruntParsed = {
        child: req.body.child,
        book: req.body.book,
        date: req.body.date
    };
    var emprunt = new Emprunt(empruntParsed)
    console.log('Emprunt to add ' + JSON.stringify(empruntParsed));

    emprunt.save(function(err, emprunt) {
        if (err) {
            console.log('Error during addition: ' + err);
            return next(err)
        }
        console.log('Emprunt added');
        res.json(204, emprunt)
    })
})


router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    console.log('New Delete on emprunt ' + id);
    Emprunt.findById(id, function(err, emprunts) {
        if (err) {
            console.log('Error during fetch: ' + err);
            return next(err);
        }
        console.log('Emprunt returned');
    }).remove(function(err, emprunts) {
        if (err) {
            console.log('Error during fetch: ' + err);
            return next(err);
        }
        console.log('Emprunt returned');
        res.status(201).json(emprunts);
    });
})


module.exports = router;
