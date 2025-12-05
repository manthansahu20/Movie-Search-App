async function searchMovie() {
    const movieName = document.getElementById("movieInput").value;
    const result = document.getElementById("result");

    if (movieName === "") {
        result.innerHTML = "<p>Please enter a movie name...</p>";
        return;
    }

    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=6079f19`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "False") {
        result.innerHTML = `<p>Movie not found 😢</p>`;
        return;
    }

    result.innerHTML = `
        <img src="${data.Poster}" class="poster" />

        <div class="details">
            <h2>${data.Title} (${data.Year})</h2>

            <p class="info"><strong>⭐ IMDB Rating:</strong> ${data.imdbRating}</p>
            <p class="info"><strong>🎭 Genre:</strong> ${data.Genre}</p>
            <p class="info"><strong>⏱ Runtime:</strong> ${data.Runtime}</p>
            <p class="info"><strong>🎬 Director:</strong> ${data.Director}</p>
            <p class="info"><strong>🎤 Actors:</strong> ${data.Actors}</p>

            <p class="plot"><strong>📖 Plot:</strong> ${data.Plot}</p>
        </div>
    `;
}
