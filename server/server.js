const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const sportsRoute = require('./routes/sports.router');
const cors = require('cors');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    console.log(req);

    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.use('/sports', sportsRoute);

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Start listening for requests on a specific port
app.listen(port, function () {
    console.log('listening on port', port);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
