$(document).ready(function () {
    getStandings()
    api()



    function getStandings() {
        nflApi = '37eew9vyws8rp5etrfqbtnp2';
        // ajax call to server to get jobs

        $.ajax({
            url: 'http://api.sportradar.us/nfl/official/trial/v5/en/seasons/2018/standings.json?api_key=' + nflApi,
            type: 'GET',
            success: function (data) {
                // console.log(data);
                displayStandings(data);
            },
            error: function (response) {
                console.log('error response', response);

            }
        })
    } // end getStandings


    function displayStandings(data) {
        let teamData = data.conferences[1].divisions[1];
        // console.log(teamData);
        var teams = teamData.teams;
        // console.log(teams);

        $('#standings').empty();

        for (let i = 0; i < teams.length; i++) {
            let newRow = $('<tr>');
            //appending rows to DOM
            newRow.append('<td>' + teams[i].market + '</td>');
            newRow.append('<td>' + teams[i].wins + '</td>');
            newRow.append('<td>' + teams[i].losses + '</td>');
            newRow.append('<td>' + teams[i].ties + '</td>');
            newRow.append('<td>' + teams[i].win_pct + '</td>');
            newRow.append('<td>' + teams[i].points_for + '</td>');
            newRow.append('<td>' + teams[i].points_against + '</td>');
            newRow.append('<td>' + teams[i].records[3].record.wins + '-' + teams[i].records[3].record.losses + '</td>');
            newRow.append('<td>' + teams[i].records[5].record.wins + '-' + teams[i].records[5].record.losses + '</td>');
            newRow.append('<td>' + teams[i].streak.desc + '</td>');

            $('#standings').append(newRow);

        }
    }

    // 'https://api.blue62.darrenrector.com/articles.json',
    function api() {
        // ajax call to server to get jobs
        $.ajax({
            url: 'http://localhost:5000/articles-api',
            type: 'GET',
            success: function (data) {
                // console.log('Data from API', data);
                displayAPIArticles(data);
            },
            error: function (response) {
                console.log('error response', response);

            }
        })
    } // end api


    function displayAPIArticles(data) {
        let articles = data;
        // console.log(articles);

        $('#articles').empty();

        for (let i = 0; i < articles.length; i++) {
            //appending rows to DOM
            // $('.articles').append('<h5>' + articles[i].article + '</h5>');
            $('.articles').append('<ul><li>' + ('<a href="' + articles[i].link + '"target="_blank">' + articles[i].article + '</a>') + '</li></ul>')
        }
    }



})