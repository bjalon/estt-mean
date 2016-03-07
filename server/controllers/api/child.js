var Child = require('../../models/childModel.js');
var router = require('express').Router();

router.get('/', function(req, res, next) {
    console.log('New GET on child');
    Child.find(function(err, children) {
        if (err) {
            console.log('Error during fetch: ' + err);
            return next(err)
        }
        console.log('Emprunt returned');
        res.json(children);
    })
})


router.post('/', function(req, res, next) {
    console.log('New POST on child');
    var childParsed = {
        name: req.body.name,
        level: req.body.level,
        birthdate: req.body.birthdate
    };
    var child = new Child(childParsed);
    console.log('Child to add ' + JSON.stringify(childParsed));
    child.save(function(err, post) {
        if (err) {
            console.log('Error during addition: ' + err);
            return next(err)
        }
        console.log('Emprunt added');
        res.json(201, post)
    })
})

router.delete('/', function(req, res, next) {
    console.log('New GET on child');
    Child.find(function(err, children) {
        if (err) {
            console.log('Error during fetch: ' + err);
            return next(err)
        }
        console.log('Emprunt returned');
        res.json(children);
    })
})


module.exports = router;
