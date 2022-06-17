(function () {
  var $ = window.show.$;

  var elSearchForm = $(".movies-form");
  var elInput = $(".movie-name");
  var elCatSelect = $("#movie-category");
  var elStartYearSelect = $("#movie-year-from");
  var elEndYearSelect = $("#movie-year-till");
  var elSortMethod = $("#sort-by");
  var elResult = $(".movies-result");

  function createOptions(el, arr) {
    var newOptFragment = document.createDocumentFragment();

    arr.forEach(function (item) {
      var option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      newOptFragment.appendChild(option);
    });

    el.appendChild(newOptFragment);
  }

  function sortByMethod(movies, sortMethod) {
    if (sortMethod === "by-alphabetical") {
      movies.sort(function (a, b) {
        if (a.title > b.title) return 1;
        else if (a.title < b.title) return -1;
        return;
      });
    } else if (sortMethod === "by-alphabetical-reversed") {
      movies.sort(function (a, b) {
        if (a.title < b.title) return 1;
        else if (a.title > b.title) return -1;
        return;
      });
    } else if (sortMethod === "by-decreased-rating") {
      movies.sort(function (a, b) {
        if (a.rating < b.rating) return 1;
        else if (a.rating > b.rating) return -1;
        return;
      });
    } else if (sortMethod === "by-increased-rating") {
      movies.sort(function (a, b) {
        if (a.rating > b.rating) return 1;
        else if (a.rating < b.rating) return -1;
        return;
      });
    }
  }

  var movies = window.data.newMovies.slice();
  var displayMovies = window.show.display;
  var cats = [];
  var isMoviesFiltered = false;

  movies.forEach(function (movie) {
    movie.categories.forEach(function (cat) {
      if (cats.indexOf(cat) === -1) cats.push(cat);
    });
  });

  cats.sort();
  var years = [];

  movies.forEach(function (movie) {
    if (years.indexOf(movie.year) === -1) years.push(movie.year);
  });

  years.sort();
  createOptions(elCatSelect, cats);
  createOptions(elStartYearSelect, years);
  createOptions(elEndYearSelect, years);

  elSearchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var inputValue = elInput.value.trim();
    var catValue = elCatSelect.value;
    var yearFrom = elStartYearSelect.value;
    var yearTill = elEndYearSelect.value;
    var sortMethod = elSortMethod.value;

    if (yearFrom > yearTill && yearFrom != "all" && yearTill != "all") {
      var output =
        "The year interval is incorrect! <br>Start point can't be larger than the end point!";
      output +=
        "<br><br><b>" +
        yearFrom +
        "</b> is larger than <b>" +
        yearTill +
        "</b>";
      output += "<br>Please choose years attentively :)";
      var infoDiv = document.createElement("div");
      infoDiv.classList.add("info-div");
      infoDiv.innerHTML = output;
      elResult.innerHTML = "";
      elResult.append(infoDiv);
      return;
    }

    if (
      inputValue === "" &&
      catValue === "all" &&
      yearFrom === "all" &&
      yearTill === "all"
    ) {
      if (sortMethod !== "default") sortByMethod(movies, sortMethod);
      else movies = window.data.newMovies.slice();

      window.search = {
        isMoviesFiltered: isMoviesFiltered,
        sortByMethod: sortByMethod,
      };

      displayMovies(movies);
      return;
    }

    function filterFunction(movie) {
      var isTitleSuitable;
      var isCategorySuitable;
      var isYearSuitable;

      if (!inputValue) isTitleSuitable = true;
      else {
        var movieTitleRegex = new RegExp(inputValue, "gi");
        isTitleSuitable = movie.title.match(movieTitleRegex);
      }

      if (catValue === "all") isCategorySuitable = true;
      else isCategorySuitable = movie.categories.includes(catValue);

      if (yearFrom === "all" && yearTill === "all") isYearSuitable = true;
      else if (yearFrom !== "all" && yearTill === "all")
        isYearSuitable = movie.year >= yearFrom;
      else if (yearFrom === "all" && yearTill !== "all")
        isYearSuitable = movie.year <= yearTill;
      else if (yearFrom !== "all" && yearTill !== "all")
        isYearSuitable = movie.year >= yearFrom && movie.year <= yearTill;

      return isTitleSuitable && isCategorySuitable && isYearSuitable;
    }

    var sortedMovies = movies.filter(function (movie) {
      return filterFunction(movie);
    });

    if (sortedMovies.length > 0) {
      if (sortMethod !== "default") sortByMethod(sortedMovies, sortMethod);
      else movies = window.data.newMovies.slice();

      isMoviesFiltered = true;
      displayMovies(sortedMovies);

      window.search = {
        isMoviesFiltered: isMoviesFiltered,
        sortedMovies: sortedMovies,
      };
    } else {
      var output = "Sorry but there are no results related to your response!";
      var infoText = document.createElement("div");
      infoText.classList.add("info-div");
      infoText.innerHTML = output;
      elResult.innerHTML = "";
      elResult.append(infoText);
    }
  });
})();
