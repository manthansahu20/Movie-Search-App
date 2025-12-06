const movieInput = document.getElementById("movieInput");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", function () {
    let movieName = movieInput.value.trim();

    if (movieName === "") {
        resultDiv.innerHTML = "<p>Please enter a movie name</p>";
        return;
    }

    let url = `https://www.omdbapi.com/?s=${movieName}&apikey=d0d2c897`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data.Response === "True") {
                let movies = data.Search;

                resultDiv.innerHTML = movies.map(movie => `
                    <div class="movie-card">
                        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/180x260'}">
                        <h3>${movie.Title}</h3>
                        <p>${movie.Year}</p>
                    </div>
                `).join("");
            } else {
                resultDiv.innerHTML = "<p>No movie found 😕</p>";
            }
        })
        .catch(err => {
            resultDiv.innerHTML = "<p>Error fetching data ❌</p>";
            console.error(err);
        });
});
