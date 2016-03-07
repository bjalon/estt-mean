var Emprunt = require('./models/empruntModel.js');

Emprunt.find({ 
	// $text : { $search : "Jalon" }
	$or: [ {'book': new RegExp(".*alon.*")}, {'child': new RegExp(".*alon.*")}]
}).sort('-date').exec(function(err, emprunts) {
    if (err) {
        console.log('Error during fetch: ' + err);
        return next(err)
    }
    console.log('Emprunt returned: ' + JSON.stringify(emprunts));
});
