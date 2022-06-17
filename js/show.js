(function () {
  // ! function for targeting elements better
  function $(e) {
    return document.querySelector(e);
  }

  // ! elements from the doc
  var elResult = $(".movies-result");
  var elMovieTemplate = $("#movie-template").content;

  // ! function for displaying all movies
  function display(movies) {
    elResult.innerHTML = "";
    var moviesFragment = document.createDocumentFragment();

    movies.forEach(function (movie) {
      var movieTemplate = document.importNode(elMovieTemplate, true);
      movieTemplate.querySelector(".movie__summary").dataset.index = movie.id;
      movieTemplate.querySelector(".movie__rating").textContent = movie.rating;
      movieTemplate.querySelector(".movie__title").textContent = movie.title;
      movieTemplate.querySelector(".movie__year").textContent = movie.year;
      movieTemplate.querySelector(".movie__categories").textContent =
        movie.categories.join(", ");
      movieTemplate.querySelector(".movie__trailer").href += movie.ytid;
      movieTemplate.querySelector(".movie__watchlist").dataset.id = movie.id;

      if (watchlist) {
        var isMovieWatchlisted = watchlist.watchlist.find(function (
          watchlistedMovie
        ) {
          return watchlistedMovie.id === movie.id;
        });

        if (isMovieWatchlisted) {
          movieTemplate.querySelector(".movie__watchlist").disabled = true;
        }
      }

      moviesFragment.appendChild(movieTemplate);
    });

    elResult.appendChild(moviesFragment);
  }

  window.show = {
    $: $,
    display: display,
  };
})();
