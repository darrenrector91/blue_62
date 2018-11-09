const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const sportsRoute = require('./routes/sports.router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.use('/sports', sportsRoute);

app.use("/articles-api", function (req, res) {
    res.json(articles);
})

// Start listening for requests on a specific port
app.listen(port, function () {
    console.log('listening on port', port);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
