const api = "6079f19";

// --------------------- AUTO SEARCH ---------------------
async function autoSearch() {
    let query = document.getElementById("searchInput").value;
    let suggestions = document.getElementById("suggestions");

    if (query.length < 2) {
        suggestions.innerHTML = "";
        return;
    }

    const url = `https://www.omdbapi.com/?s=${query}&apikey=${api}`;
    let res = await fetch(url);
    let data = await res.json();

    if (data.Search) {
        suggestions.innerHTML = data.Search
            .map(movie => `<li onclick="searchMovie('${movie.Title}')">${movie.Title}</li>`)
            .join("");
    }
}

// --------------------- SEARCH MOVIE ---------------------
async function searchMovie(title) {
    document.getElementById("loading").style.display = "block";
    document.getElementById("result").style.display = "none";

    const url = `https://www.omdbapi.com/?t=${title}&apikey=${api}`;
    let res = await fetch(url);
    let data = await res.json();

    document.getElementById("loading").style.display = "none";

    if (data.Response === "False") {
        alert("Movie not found!");
        return;
    }

    document.getElementById("result").style.display = "block";
    document.getElementById("suggestions").innerHTML = "";

    document.getElementById("result").innerHTML = `
        <img src="${data.Poster}">
        <h2>${data.Title} (${data.Year})</h2>
        <p class="info"><b>⭐ Rating:</b> ${data.imdbRating}</p>
        <p class="info"><b>Genre:</b> ${data.Genre}</p>
        <p class="info"><b>Actors:</b> ${data.Actors}</p>
        <p class="plot"><b>Plot:</b> ${data.Plot}</p>
        <button class="fav-btn" onclick="addFav('${data.Title}','${data.Poster}')">Add to Favorites ❤️</button>
    `;
}

// --------------------- TRENDING MOVIES ---------------------
async function loadTrending() {
    const url = `https://www.omdbapi.com/?s=avengers&apikey=${api}`;
    let res = await fetch(url);
    let data = await res.json();

    if (data.Search) {
        document.getElementById("trending").innerHTML =
            data.Search.map(movie => `
            <div class="card" onclick="searchMovie('${movie.Title}')">
                <img src="${movie.Poster}">
                <p>${movie.Title}</p>
            </div>
        `).join("");
    }
}
loadTrending();

// --------------------- FAVORITES (LOCAL STORAGE) ---------------------
function addFav(title, poster) {
    let favs = JSON.parse(localStorage.getItem("favs")) || [];

    favs.push({ title, poster });
    localStorage.setItem("favs", JSON.stringify(favs));

    loadFavs();
}

function loadFavs() {
    let favs = JSON.parse(localStorage.getItem("favs")) || [];

    document.getElementById("favorites").innerHTML = favs
        .map(f => `
            <div class="card">
                <img src="${f.poster}">
                <p>${f.title}</p>
            </div>
        `)
        .join("");
}
loadFavs();
