const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const sportsRoute = require('./routes/sports.router');
const cors = require('cors');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.use('/sports', sportsRoute);

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Start listening for requests on a specific port
app.listen(port, function () {
    console.log('listening on port', port);
});
