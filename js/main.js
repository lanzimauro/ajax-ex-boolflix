
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

                    var linguaOriginale = linguaFilmOriginale(film);
                    var stelleVoto = votoEffettivo(film);

                    var filmTemplate = {
                    title: film.title,
                    original_title: film.original_title,
                    original_language: linguaOriginale,
                    vote_average: stelleVoto
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




// FUNZIONE PER MOSTRARE LA BANDIERA CORRISPONDENTE ALLA LINGUA ORIGINALE DEL FILM

    function linguaFilmOriginale(film) {
        var language = '';
        if (film.original_language == 'it') {
            language += ('<img src="img/Italy.svg.png" alt="">')
        } else if (film.original_language == 'zh') {
            language += ('<img src="img/China.svg.png" alt=""');
        } else if (film.original_language == 'en') {
            language += ('<img src="img/US.svg.png" alt=""');
        } else if (film.original_language == 'fr') {
            language += ('<img src="img/France.svg.png" alt=""');
        } else if (film.original_language == 'es') {
            language += ('<img src="img/Spain.svg.png" alt=""');
        } else {
            language += (film.original_language);
        }
        return language;

    }


// FUNZIONE PER CONVERSIONE VOTO IN STELLE
    function votoEffettivo(film) {
        var votoStelle = '';
        var votoEffettivo = Math.round(film.vote_average / 2);
        for (var z = 0; z < 5; z++) {
            if (z <= votoEffettivo) {
                votoStelle += ('<i class="fas fa-star"></i>');
            } else {
                votoStelle +=('<i class="far fa-star"></i>')
            }
        }
        return votoStelle;
    }





});
