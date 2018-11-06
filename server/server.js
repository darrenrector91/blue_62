const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const sportsRoute = require('./routes/sports.router');

var articles = [
    {
        "article": "Jordan Howard TD run ends with epic team celebration",
        "link": "https://bearswire.usatoday.com/2018/11/04/jordan-howard-td-run-ends-with-epic-team-celebration/"
    },
    {
        "article": "Bears open as 6-point favorite over Lions in Week 10",
        "link": "https://bearswire.usatoday.com/2018/11/04/bears-open-as-6-point-favorite-over-lions-in-week-10/"
    },
    {
        "article": "Jordan Howard set the tone for Bears' physical 41-9 victory over Bills",
        "link": "https://bearswire.usatoday.com/2018/11/04/jordan-howard-set-the-tone-for-bears-physical-41-9-victory-over-bills/"
    },
    {
        "article": "Bears dominant in Week 9 despite mixed bag from Mitch Trubisky",
        "link": "https://bearswire.usatoday.com/2018/11/04/bears-dominant-in-week-9-despite-mixed-bag-from-mitch-trubisky/"
    }
]

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
