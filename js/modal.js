(function () {
  var $ = window.show.$;
  var elResult = $(".movies-result");
  var elModal = $(".modal");

  elResult.addEventListener("click", function (e) {
    if (e.target.matches(".movie__summary")) {
      var index = parseInt(e.target.dataset.index, 10);

      // ! Check if movies are filtered by any order or not
      if (window.search && window.search.isMoviesFiltered)
        var movieForModal = window.search.sortedMovies.find(function (movie) {
          return movie.id === index;
        });
      else
        var movieForModal = window.data.newMovies.find(function (movie) {
          return movie.id === index;
        });

      elModal.querySelector(".modal__title").textContent = movieForModal.title;
      elModal.querySelector(".modal__rating").textContent =
        movieForModal.rating;
      elModal.querySelector(".modal__year").textContent = movieForModal.year;
      elModal.querySelector(".modal__categories").textContent =
        movieForModal.categories.join(", ");
      elModal.querySelector(".modal__summary").textContent =
        movieForModal.summary;

      elModal.classList.add("modal--show");

      function closeModalOnClick(e) {
        if (e.target.matches(".modal") || e.target.matches(".modal__close")) {
          this.classList.add("fade-left-up");
          this.addEventListener("animationend", removeClasses);
        }
      }

      function closeModalOnKeyUp(e) {
        if (e.keyCode === 27) {
          elModal.classList.add("fade-left-up");
          elModal.addEventListener("animationend", removeClasses);
        }
      }

      function removeClasses() {
        elModal.classList.remove("modal--show");
        elModal.classList.remove("fade-left-up");

        elModal.removeEventListener("animationend", removeClasses);
        elModal.removeEventListener("click", closeModalOnClick);
        document.removeEventListener("keyup", closeModalOnKeyUp);
      }

      elModal.addEventListener("click", closeModalOnClick);
      document.addEventListener("keyup", closeModalOnKeyUp);
    }
  });
})();
