
$(document).ready(function () {
    var source = $('#card-template').html();
    var cardTemplate = Handlebars.compile(source);

    var apiBaseUrl = 'https://api.themoviedb.org/3';

    $('#button').on('click', function () {
        var valoreCercato = $('.cerca').val();
        $('.cerca').val('')
        $('.card').hide();
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
                    var filmTemplate = {
                    title: film.title,
                    original_title: film.original_title,
                    original_language: film.original_language,
                    vote_average: film.vote_average
                }
                var cardFilm = cardTemplate(filmTemplate);
                $('.container').append(cardFilm);
                }
            },
            error: function (err) {
                console.log('ERRORE');
            }

        });
    });
});
