$(document).ready(function(){

  var searchMovie = "ritorno al futuro";

  // STAMPA A SCHERMO LE INFO DEL FILM
  renderMovie(searchMovie);


});

// FUNZIONE DI STAMPA DELLE INFORMAZIONI DEL FILM
function renderMovie(movies){
  // CHIAMATA AL SERVER PER LA RICERCA DELLE INFO RICHIESTE
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false",
      "data": {
        "api_key": "0dc314a9e6f7e554dbdb64c779cd9892",
        "query": "searchMovie",
        "language": "it"
      },
      "method": "GET",
      "success": function(data){
        var moviesDb = data.result;

        var source = $("#info-movie-template").html();
        var template = Handlebars.compile(source);

        // STAMPA INFO FILM
        for (var i = 0; i <= moviesDb.lenght; i++) {
          var context = {
            "title": moviesDb[i].title,
            "original_title": moviesDb[i].original_title,
            "original_language": moviesDb[i].original_language,
            "vote_average": moviesDb[i].vote_average
          };

          var html = template(context);

          $("#movies-list").append(html);
        }
      },
      "error" : function() {
        alert("Errore!");
      }
    }
  );

}
