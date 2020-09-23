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
              var moviesDb = data.results;

              // LINK TO HANDLEBARS
              var source = $("#info-movie-template").html();
              var template = Handlebars.compile(source);

              // INFO ABOUT THE MOVIE
              for (var i = 0; i < moviesDb.length; i++) {
                
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
      } else {
        alert("Non hai scritto nulla!");
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
