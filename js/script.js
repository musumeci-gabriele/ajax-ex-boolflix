$(document).ready(function(){

  var searchMovie = "ritorno al futuro";

  // CHIAMATA AL SERVER PER LA RICERCA DELLE INFO RICHIESTE
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false",
      "data": {
        "api_key": "0dc314a9e6f7e554dbdb64c779cd9892",
        "query": searchMovie,
        "language": it-IT
      },
      "method": "GET",
      "success": function(data){
        console.log(data.result);
      },
      "error": function(){
        alert("Errore!");
      }
    }
  );

});

// FUNZIONE DI STAMPA DELLE INFORMAZIONI DEL FILM
function renderMovie(movies){
  var source = $("#info-movie-template").html();
  var template = Handlebars.compile(source);

  // STAMPA INFO FILM
  for (var i = 0; i <= movies.lenght; i++) {
    var context = {
      "title": movies[i].title,
      "original_title": movies[i].original_title,
      "original_language": movies[i].original_language,
      "vote_count": movies[i].vote_count
    };

    var html = template(context);

    $("#movies-list").append(html);
  }
}
