$(document).ready(function () {
    // console.log('Client loaded!');

    getStandings()
    getJson()

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
        console.log(teamData);
        var teams = teamData.teams;
        console.log(teams);

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

    function displayArticles(data) {
        let articles = data;
        console.log(articles);
        console.log(articles.length);


        $('#articles').empty();

        for (let i = 0; i < articles.length; i++) {
            //appending rows to DOM
            $('.articles').append('<h5>' + articles[i].article + '</h5>');
            $('.articles').append('<a href="' + articles[i].link + '"target="_blank">' + articles[i].link + '</a>');



        }
    }


    function getJson() {

        // ajax call to server to get jobs
        $.ajax({
            url: 'http://localhost:3000/news',
            type: 'GET',
            success: function (data) {
                // console.log(data);
                displayArticles(data);
            },
            error: function (response) {
                console.log('error response', response);

            }
        })
    } // end getStandings


})