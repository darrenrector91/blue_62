$(document).ready(function () {

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
            // console.log(totGamesPlayed);
            let tiesPct = c * 0.5;
            // console.log(tiesPct);
            let winTotal = a + tiesPct;
            // console.log(winTotal);
            let winPct = (winTotal / totGamesPlayed).toFixed(3);
            console.log(winPct);

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
        let schedule = data;
        // console.log(data);
        let matchups = schedule.game;
        // console.log(matchups);

        $('#schedule').empty();

        for (let i = 0; i < matchups.length; i++) {
            //appending rows to DOM
            let newRow = $('<tr>');
            //appending rows to DOM
            newRow.append('<td>' + matchups[i].date + '</td>');
            newRow.append('<td>' + matchups[i].opponent + '</td>');
            newRow.append('<td>' + matchups[i].result + '</td>');

            $('#schedule').append(newRow);
        }
    }

    // Articles
    $.getJSON("./json/articles.json", function (data) {
        // console.log(data); 
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
})