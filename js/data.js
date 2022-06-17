(function () {
  var newMovies = movies.map(function (movie, index) {
    return {
      id: index,
      title: movie.Title.toString(),
      year: movie.movie_year,
      summary: movie.summary,
      rating: movie.imdb_rating,
      ytid: movie.ytid,
      categories: movie.Categories.split("|"),
    };
  });

  window.data = {
    newMovies: newMovies,
  };
})();
