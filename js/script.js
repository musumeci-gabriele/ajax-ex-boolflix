$(document).ready(function(){

  // FUNCTION CALL TO SERVER FOR INFO ABOUT THE MOVIE
  function renderMovie(movies){

      if (searchMovie != ""){
        $(".input-title").val("");
        $("#movies-list").html("");

        // RECALL TO SERVER FOR INFO ABOUT THE MOVIE
        $.ajax(
          {
            "url" : "https://api.themoviedb.org/3/search/movie",
            "data" : {
              "api_key": "0dc314a9e6f7e554dbdb64c779cd9892",
              "query": searchMovie,
              "language": "it"
            },
            "method" : "GET",
            "success" : function(data){
              infoSuccess(data.results);
            },
            "error" : function() {
              alert("Errore!");
            }
          }
        );
      } else {
        alert("Non hai scritto nulla!");
      }
  }
  
  //  FUNCTION HABDLEBARS
  function infoSuccess(movies){

    // LINK TO HANDLEBARS
    var source = $("#info-movie-template").html();
    var template = Handlebars.compile(source);

    // INFO ABOUT THE MOVIE
    for (var i = 0; i < movies.length; i++) {

      var context = {
        "title": movies[i].title,
        "original_title": movies[i].original_title,
        "original_language": movies[i].original_language,
        "vote_average": movies[i].vote_average
      };

      var html = template(context);

      $("#movies-list").append(html);
    }
  }

  // EVENT CLICK ON SEARCH BUTTON
  $(".btn-search").click(
    function(){
      searchMovie = $(".input-title").val();
      // PRINT INFO ABOUT THE MOVIE
      renderMovie(searchMovie);
    }
  );

  // EVENT KEYDOWN
  $(".input-title").keydown(
    function(event) {
      if (event.which ==13){
        searchMovie = $(".input-title").val();
        // STAMPA A SCHERMO LE INFO DEL FILM
        renderMovie(searchMovie);
      }
    }
  );

});

// APPUNTI  <i class="fas fa-star"></i> STELLA
// https://api.themoviedb.org/3/search/tv CHIAMATA SERIE Tv
