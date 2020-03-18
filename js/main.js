
$(document).ready(function () {

    var apiBaseUrl = 'https://api.themoviedb.org/3';

    $('#button').on('click', function () {
        var valoreCercato = $('.cerca').val();
        $('.cerca').val('')
        $.ajax({
            url: apiBaseUrl + '/search/movie',
            data: {
                api_key: 'fce468cbc623dcd332be8cef7e5f0af2',
                query: valoreCercato,
                language: 'it-IT'
            },
            method: 'GET',
            success: function (data) {
                var films = data.results;
                for (var i = 0; i < films.length; i++) {
                    var film = films[i];
                    console.log(film.title);
                    console.log(film.original_title);
                    console.log(film.original_language);
                    console.log(film.vote_count);
                }
            },
            error: function (err) {
                console.log('ERRORE');
            }

        });
    });
});
