$(document).ready(function () {

    owAPI = '749da4002db4023d33f77723c728f9ec';
    // qwIcons ='https://openweathermap.org/img/w/'

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

        $('#schedule').empty();

        for (let i = 0; i < schedule.length; i++) {

            date = schedule[i].date;
            opp = schedule[i].opponent;
            loc = schedule[i].location;
            result = schedule[i].result;

            //appending rows to DOM
            let newRow = $('<tr class="schedule-row">');
            //appending rows to DOM
            newRow.append('<td data-col="date">' + date + '</td>');
            newRow.append('<td data-col="opponent">' + opp + '</td>');
            newRow.append('<td data-col="location">' + loc + '</td>');
            newRow.append('<td data-col="result">' + result + '</td>');
            newRow.append('<td><button type="button" class="btn btn-primary weatherButton" value=' + loc + '><i class="fas fa-cloud-sun"></i>Weather</button><a href="#"></button></td>');

            $('#schedule').append(newRow);
        }
    }

    //  Script allows for selectable column data when button clicked SEE: html table 'data-col='
    function weatherButton(value) {
        $('.weather-wrapper').empty();

        let location = $(this).val();
        // console.log(location);

        if (location === 'Away') {
            var col, txt;
            col = $('#schedule-table').data('col');
            txt = $(this).parent().siblings("td[data-col=" + col + "]").text();

            var visitor = txt;
            // console.log('opponent: ', visitor);
            getWeather(visitor)
        } else {
            getWeather('Chicago')
        }
    }

    function getWeather(values) {
        let city = values;

        if (city == 'NY Giants') {
            city = city.replace("NY Giants", "East Rutherford")
        }
        else if (city == 'Minnesota') {
            city = city.replace("Minnesota", "Minneapolis")
        }
        else {
            city == city
        }
        // ajax call to server to get jobs
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=' + owAPI,
            type: 'GET',
            success: function (data) {
                // console.log(data.weather);
                allData = data;
                main = data.main;
                weather = data.weather;

                t = main.temp;
                temp = t.toFixed(0);
                name = allData.name;

                $(".weather-wrapper").append('<h1 id="loc-name">' + name + "</h1>");
                $(".weather-wrapper").append('<h2 id="loc-temp">' + temp + "º" + "</h2>");

                for (let i = 0; i < 1; i++) {
                    //appending rows to DOM
                    desc = weather[i].description;
                    icon = weather[i].icon;

                    $(".weather-wrapper").append('<h3 class="loc-desc">' + desc + "</h3>");
                    $(".weather-wrapper").append('<img class="weather-icon" src="http://openweathermap.org/img/w/' + icon + '.png"></img>');
                }
            },
            error: function (response) {
                console.log('error response', response);
            }
            // display on DOM 
        })
    } // end getJobs

    // Articles
    $.getJSON("./json/articles.json", function (data) {
        displayAPIArticles(data)
    });

    function displayAPIArticles(data) {
        let articles = data;

        $('#articles').empty();
        for (let i = 0; i < articles.length; i++) {
            //appending rows to DOM
            $('.articles').append('<ul><li>' + ('<a href="' + articles[i].link + '"target="_blank">' + articles[i].article + '</a>') + '</li></ul>')
        }
    }
})