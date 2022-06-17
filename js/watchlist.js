(function () {
  var $ = window.show.$;

  var movies = window.data.newMovies;
  var elResult = $(".movies-result");
  var watchlistElement = $(".watchlist__list");
  var watchlistItemTemplate = $("#watchlist-item-template").content;

  var watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  var createWatchlistItemElement = function (movie, index) {
    var watchlistItem = document.importNode(watchlistItemTemplate, true);
    watchlistItem.querySelector(".watchlist__title").textContent = movie.title;
    watchlistItem.querySelector(".watchlist__remove-button").dataset.index =
      index;

    return watchlistItem;
  };

  var createWatchlistFragment = function (watchlistedMovies) {
    var watchlistFragment = document.createDocumentFragment();

    watchlistedMovies.forEach(function (movie, index) {
      watchlistFragment.appendChild(createWatchlistItemElement(movie, index));
    });

    return watchlistFragment;
  };

  var renderWatchlist = function (watchlist) {
    watchlistElement.innerHTML = "";
    watchlistElement.appendChild(createWatchlistFragment(watchlist));
  };

  renderWatchlist(watchlist);

  elResult.addEventListener("click", function (evt) {
    if (evt.target.matches(".movie__watchlist")) {
      var movieId = parseInt(evt.target.dataset.id, 10);
      var movieToWatch = movies.find(function (movie) {
        return movie.id === movieId;
      });

      evt.target.disabled = true;
      console.log(evt.target);

      watchlist.push(movieToWatch);

      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      renderWatchlist(watchlist);
    }
  });

  watchlistElement.addEventListener("click", function (evt) {
    if (evt.target.matches(".watchlist__remove-button")) {
      watchlist.splice(evt.target.dataset.index, 1);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      renderWatchlist(watchlist);

      // ! Check if movies are filtered by any order or not
      if (window.search) {
        var sortMethod = $("#sort-by").value;

        if (sortMethod !== "default")
          window.search.sortByMethod(movies, sortMethod);
        else movies = window.data.newMovies.slice();

        show.display(movies);
      } else {
        show.display(movies);
      }
    }
  });

  window.watchlist = {
    watchlist: watchlist,
  };
})();
