var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, DELETE, OPTIONS, POST");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/emprunt', require('./controllers/api/emprunt'))
app.use('/api/child', require('./controllers/api/child'))
app.use('/api/book', require('./controllers/api/book'))


app.get('/api/*', function(req, res, next) {
    console.log('No endpoint');
    res.json(emprunts);
});



app.listen(3000, function() {
    console.log('Server listening on', 3000)
})
