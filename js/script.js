$(document).ready(function() {

  // click sul bottone di ricerca
  $(".search").click(function(){
    search();
    $(".slide").show();
    $("h2").show();
    $(".prewiew").hide();
    $(".prev").show()
    $(".next").show()
  });

  // avvio la ricerca tramite il tasto invio
  $("#text-search").keyup(function(event) {
    if(event.which == 13) {
      search();
      $(".slide").show();
      $("h2").show();
      $(".prewiew").hide();
      $(".prev").show()
      $(".next").show()
    }
  });

  scrollHorizontal($("#list-movies"), $(".prima"));
  scrollHorizontal($("#list-tv"), $(".seconda") );


});

function search() {
  // prendere il valore della input
  var searchMovie = $("#text-search").val();
  // recupero i film
  searchFilmMovie("movie", searchMovie);

  // recupero le serie tv
  searchFilmMovie("tv", searchMovie);
  clear();
}

function renderMovies(type, movies) {

  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);
  // stampare ogni film ricevuto dalla chiamata api
  for (var i = 0; i < movies.length; i++) {

    var title, original_title, container;

    if(type == "movie") {
      title = movies[i].title;
      original_title = movies[i].original_title;
      container = $("#list-movies");
    } else if(type == "tv") {
      title = movies[i].name;
      original_title = movies[i].original_name;
      container = $("#list-tv");
    }

    if(movies[i].poster_path == null) {
      var poster = "img/no_poster.png";
    } else {
      var poster = "https://image.tmdb.org/t/p/w500"+movies[i].poster_path;
    }
    // prepariamo il nostro context
    var context = {
      "poster_path": poster,
      "title": title,
      "title_orginal": original_title,
      "lang": createFlag(movies[i].original_language),
      "vote": voteConv(movies[i].vote_average),
      "type": type,
      "id": movies[i].id
    };
    // prepariamo il nostro html
    var html = template(context);
    // iniettiamo il nostro html nel tag ul
    container.append(html);

    getDetails(type, movies[i].id)
  }
};

function searchFilmMovie(type, query) {
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/"+type,
      "data": {
        "api_key": "a92c70d17769dad688409545a34d10d6",
        "query": query,
        "language": "it-IT"
      },
      "method": "GET",
      "success": function(data) {
          var moviesTv = data.results;
          renderMovies(type, moviesTv);

          if (moviesTv.length == 0 && type == "movie") {
            $(".film").hide();
            $(".movies-title").text("Non sono stati trovati film riguardo questa ricerca");
          }
          else if (moviesTv.length == 0 && type == "tv") {
            $(".tv").hide();
              $(".serie").text("Non sono stati trovate serie tv riguardo questa ricerca");
          }

          if (moviesTv.length > 0 && type == "movie") {
            $(".film").show();
            $(".movies-title").text("Movies");

          }
          else if (moviesTv.length > 0 && type == "tv") {
            $(".tv").show();
              $(".serie").text("Series");

          }


      },
      "error": function(err) {
        alert("Errore!");
      }
    }
  );
};

function clear() {
  $("#list-tv").html("");
  $("#list-movies").html("");
  $("#text-search").val("");
}

function voteConv(vote) {
  // Vote to 5
  var starVote = Math.ceil(vote / 2);

  // Create string for stars
  var totalStars = "";
  for (var i = 0; i < 5; i++) {
    if (i < starVote) {
      totalStars += "<i class='fas fa-star'></i>";
    } else {
      totalStars += "<i class='far fa-star'></i>";
    }
  }
  return totalStars
};


function createFlag(linguaOriginale) {
    var flags = ["de", "da", "el", "en", "es", "fr", "it", "ja", "ko", "nl", "pl", "ru", "th", "tl", "zh"];
    if (flags.includes(linguaOriginale)) {
      return (" <img class='language-flag' src='img/" + linguaOriginale + ".svg'>");
    } else {
      return lang;
    }
  }


function scrollHorizontal(lista, classeFreccia ) {
  var box = lista;
  var boxScroll;
  classeFreccia.click(function() {
    if ($(this).hasClass("next")) {
      boxScroll = ((box.width() / 2)) + box.scrollLeft();
      box.animate({
        scrollLeft: boxScroll,
      })
    } else {
      x = ((box.width() / 2)) - box.scrollLeft();
      box.animate({
        scrollLeft: -boxScroll,
      })
    }
  })
}

function printDetails(data, id, list) {

  var source = $("#cast-template").html();
  var template = Handlebars.compile(source);

  var limit;
  if(data.length > 4) {
    limit = 5;
  } else {
    limit = data.length;
  }

  for (var i = 0; i < limit; i++) {

    var context = {
      "name": data[i].name
    };

    var html = template(context);

    var container;
    if(list == "cast") {
      container = $("li[data-id='"+id+"'] .cast");
      console.log(container);

    } else if(list == "genres") {
      container = $("li[data-id='"+id+"'] .genres");
      console.log(container);
    }

    container.append(html);
  }
}
function getDetails(type, id) {
  // eseguire una chiamata al server per recuperare il cast
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/"+type+"/"+id+"/credits",
      "data": {
        "api_key": "51a580ca8c75a33ea40810a340044302",
      },
      "method": "GET",
      "success": function(data) {
        if(data.cast.length > 0) {
          printDetails(data.cast, id, "cast");
        }
      },
      "error": function(err) {
        alert("Errore!");
      }
    }
  );
  // eseguire una chiamata al server per recuperare i genres
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/"+type+"/"+id,
      "data": {
        "api_key": "51a580ca8c75a33ea40810a340044302",
      },
      "method": "GET",
      "success": function(data) {
        if(data.genres.length > 0) {
          printDetails(data.genres, id, "genres");
        }
      },
      "error": function(err) {
        alert("Errore!");
      }
    }
  );
}