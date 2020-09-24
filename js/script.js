$(document).ready(function(){

  // FUNCTION PRINT STARS
  function stars(vote){
    var numStar = Math.ceil((vote)/2);
    var htmlStars ="";

    for (var i = 1; i <= 5; i++) {
      // ciclo per la stampa delle stelle piene e vuote
      if (i <= numStar){
        htmlStars += '<i class="fas fa-star yellow"></i>';
      } else {
        htmlStars += '<i class="far fa-star yellow"></i>';
      }

    }
    return htmlStars;
  }

  // FUNCTION FLAGS
  function changeFlag(language){
    var flags = ["es","de","fr","en","it"];

    if (flags.includes(language)) {
      return "<img class='img-flag' src='img/"+language+".svg'>";
    }

    return language;
  };

  // FUNCTION CALL TO SERVER FOR INFO ABOUT THE MOVIE
  function renderMovie(searchMovie){

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
          infoSuccess("Film", data.results);
        },
        "error" : function() {
          alert("Errore!");
        }
      }
    );

  }


  // FUNCTION CALL TO SERVER FOR INFO ABOUT THE SERIES TV
  function renderSeries(searchSeries){

    $.ajax(
      {
        "url" : "https://api.themoviedb.org/3/search/tv",
        "data" : {
          "api_key": "0dc314a9e6f7e554dbdb64c779cd9892",
          "query": searchSeries,
          "language": "it"
        },
        "method" : "GET",
        "success" : function(data){
          infoSuccess("Serie Tv", data.results);
        },
        "error" : function() {
          alert("Errore!");
        }
      }
    );

  }

  //  FUNCTION HABDLEBARS
  function infoSuccess(type, results){

    // LINK TO HANDLEBARS
    var source = $("#info-movie-template").html();
    var template = Handlebars.compile(source);

    // INFO ABOUT THE MOVIE
    for (var i = 0; i < ((type, results).length); i++) {

      var title, original_title;

      if(type == "Film"){
        title = results[i].title;
        original_title = results[i].original_title;
      } else if(type == "Serie tv"){
        title = results[i].name;
        original_title = results[i].original_name;
      }

      var context = {
        "title": title,
        "original_title": original_title,
        "original_language": changeFlag(results[i].original_language),
        "vote_average": stars(results[i].vote_average),
        "type": type
      };

      var html = template(context);

      $("#serch-list").append(html);
    }
  }

  // FUNCTION CLEAR INPUT
  function clearInput(){
    if (searchMovie != ""){
      $(".input-title").val("");
      $("#search-list").html("");
    } else {
      alert("Non hai scritto nulla!");
    }
  }

  // EVENT CLICK ON SEARCH BUTTON
  $(".btn-search").click(
    function(){
      var search = $(".input-title").val();
      // PRINT INFO ABOUT THE SEARCH
      renderMovie(search);
      renderSeries(search);

    }
  );

  // EVENT KEYDOWN
  $(".input-title").keydown(
    function(event) {
      if (event.which ==13){
        var search = $(".input-title").val();

        // PRINT INFO ABOUT THE SEARCH
        renderMovie(search);
        renderSeries(search);


      }
    }
  );

});

// APPUNTI  <i class="fas fa-star"></i> STELLA
// https://api.themoviedb.org/3/search/tv CHIAMATA SERIE Tv
