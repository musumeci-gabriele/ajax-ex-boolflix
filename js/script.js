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

  // GENERIC CALL API
  function getData(type, searchString){

    $.ajax(
      {
        "url" : "https://api.themoviedb.org/3/search/"+type,
        "data" : {
          "api_key": "0dc314a9e6f7e554dbdb64c779cd9892",
          "query": searchString,
          "language": "type"
        },
        "method" : "GET",
        "success" : function(data){
          if (data.total_results > 0) {
            infoSuccess(type, data.results);
          } else {
            notFound(type);
          }

        },
        "error" : function(error) {
          alert("Errore!");
        }
      }
    );

  }


  //  FUNCTION HABDLEBARS
  function infoSuccess(type, results){

    // LINK TO HANDLEBARS FOR PRINT INFO
    var source = $("#info-movie-template").html();
    var template = Handlebars.compile(source);

    // INFO ABOUT THE MOVIE FROM API
    for (var i = 0; i < ((type, results).length); i++) {

      var title, original_title, container;

      if(type == "movie"){
        title = results[i].title;
        original_title = results[i].original_title;
        container = $("#movie");
      } else if(type == "tv"){
        title = results[i].name;
        original_title = results[i].original_name;
        container = $("#series");
      }

      // POSTER PRESENTE O NO
      if(results[i].poster_path == null ){
       var poster = "img/no-poster.jpg";
      }else{
       var poster = "https://image.tmdb.org/t/p/w185"+results[i].poster_path;
     };

      var context = {
        "poster" : poster,
        "title": title,
        "original_title": original_title,
        "original_language": changeFlag(results[i].original_language),
        "vote_average": stars(results[i].vote_average),
        "type": type,
        "overview" : results[i].overview
      };

      var html = template(context);
      container.append(html);

    }
  }

  // la ricerca non produce risultati
  function notFound(type){
    alert("La ricerca non ha prodotto risultati")
  }


  // FUNCTION RESEARCH
  function search(){
    var search = $("#input-title").val();
    // CLEAR PAGE
    resetSearch();
    // PRINT INFO MOVIE
    getData("movie", search);
    // PRINT INFO SERIES
    getData("tv", search);
  }

  // FUNCTION RESET SEARCH
  function resetSearch(){
    $("#input-title").val("");
    $("#movie, #series").html("");
  }

  // EVENT CLICK ON SEARCH BUTTON
  $("#btn-search").click(
    function(){
      search();
    }
  );

  // EVENT KEYDOWN FOR SEARCH
  $("#input-title").keydown(
    function(event) {
      if (event.which ==13){
      search();
      }
    }
  );

});

// APPUNTI  <i class="fas fa-star"></i> STELLA
// https://api.themoviedb.org/3/search/tv CHIAMATA SERIE Tv
