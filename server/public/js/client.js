$(document).ready(function () {

    owAPI = '749da4002db4023d33f77723c728f9ec';

    // Opponent array
    var opponentArray = [];
    // console.log('opponentArray', opponentArray);

    $('#schedule').on('click', '.weatherButton', weatherButton);

    // Standings
    $.getJSON("./json/standings.json", function (data) {
        displayStandings(data)
    });

    function displayStandings(data) {
        let standings = data.team

        $('#standings').empty();

        for (let i = 0; i < standings.length; i++) {

            a = parseFloat(standings[i].wins);
            b = parseFloat(standings[i].losses);
            c = parseFloat(standings[i].ties);

            totGamesPlayed = a + b + c;
            let tiesPct = c * 0.5;
            let winTotal = a + tiesPct;
            let winPct = (winTotal / totGamesPlayed).toFixed(3);

            let newRow = $('<tr>');
            //appending rows to DOM
            newRow.append('<td>' + standings[i].name + '</td>');
            newRow.append('<td>' + standings[i].wins + '</td>');
            newRow.append('<td>' + standings[i].losses + '</td>');
            newRow.append('<td>' + standings[i].ties + '</td>');
            newRow.append('<td>' + winPct + '</td>');
            newRow.append('<td>' + standings[i].points_for + '</td>');
            newRow.append('<td>' + standings[i].points_against + '</td>');

            $('#standings').append(newRow);
        }
    }

    // Schedule
    $.getJSON("./json/schedule.json", function (data) {
        displaySchedule(data)
    });

    function displaySchedule(data) {
        let schedule = data.game;
        // console.log(schedule);

        let matchups = schedule

        $('#schedule').empty();

        for (let i = 0; i < matchups.length; i++) {

            opp = matchups[i].opponent;
            // console.log(opp);
            date = matchups[i].date;
            result = matchups[i].result;
            values = [opp, date, result];

            opponentArray.push(opp);

            //appending rows to DOM
            let newRow = $('<tr class="schedule-row">');
            //appending rows to DOM
            newRow.append('<td data-col="date">' + date + '</td>');
            newRow.append('<td data-col="opponent">' + opp + '</td>');
            newRow.append('<td data-col="result">' + result + '</td>');
            newRow.append('<td><button type="button" class="btn btn-primary weatherButton" value=' + date + '><i class="fas fa-cloud-sun"></i>Weather</button><a href="#"></button></td>');

            $('#schedule').append(newRow);
        }
    }


    //  Script allows for selectable column data when button clicked SEE: html table 'data-col='
    $('body').on('click', '.weatherButton', function (e) {
        var col, txt;
        col = $('#schedule-table').data('col');
        console.log(col);

        txt = $(this).parent().siblings("td[data-col=" + col + "]").text();
        e.preventDefault();

        var visitor = txt;
        visitor = visitor.replace("at ", "")
        console.log('visitor: ', visitor);

    });


    // var str = "data-123";
    // str = str.replace("data-", "");

    // Articles
    $.getJSON("./json/articles.json", function (data) {
        displayAPIArticles(data)
    });

    function displayAPIArticles(data) {

        let articles = data;
        $('#articles').empty();
        for (let i = 0; i < articles.length; i++) {
            //appending rows to DOM
            // $('.articles').append('<h5>' + articles[i].article + '</h5>');
            $('.articles').append('<ul><li>' + ('<a href="' + articles[i].link + '"target="_blank">' + articles[i].article + '</a>') + '</li></ul>')
        }
    }

    function weatherButton(value) {

        let opponent = $(this).val();
        // console.log(opponent);

        if (opponent.includes("at")) {
            console.log('true');

            getWeather(opponent)
        }
        else {
            // makes home games use 'Chicago' for the weather city because Chicago is the home team
            opponent = 'Chicago'
            getWeather(opponent)
        }
    }

    // weather done by city name using openweather API
    // if today's date IS game date give current weather
    // if today's date is <= 5 days but !current day give 3 day forcast
    // if today's date is > 5 days from game day, give 16 day forcast
    // if date is earlier than today's date then do not show weather button

    function getWeather(values) {
        let city = values;
        console.log(city);

        let dateObj = new Date();
        let month = dateObj.getMonth() + 1; //months from 1-12
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();
        let fourDays = dateObj.getDate() + 5;

        todaysDate = month + "/" + day + "/" + year;
        fourDaysStr = month + "/" + fourDays + "/" + year;

        var params = {
            type: 'GET',
            success: function (data) {
                console.log('weather: ', data);
            },
        };
        if (todaysDate === todaysDate) {
            params.url = 'api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial';
        }
        if (todaysDate > todaysDate && (todaysDate <= fourDaysStr)) {
            params.url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + ',US&units=imperial&cnt=5&APPID=' + owAPI;
        }
        else {
            params.url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + ',US&units=imperial&cnt=16&APPID=' + owAPI;
        }

        $.ajax(params);
    }
})