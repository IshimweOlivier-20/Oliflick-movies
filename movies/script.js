const apiKey = "1e132333";

async function fetchMovies(keyword) {
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(keyword)}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True") {
            return data.Search;
        } else {
            console.error(data.Error);
            return [];
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}


async function populateCarousel(keyword, carouselId) {
    const movies = await fetchMovies(keyword);
    const carouselRow = document.querySelector(`#${carouselId} .carousel-row`);
    carouselRow.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = `
            <div class="movie-card">
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150x225"}" alt="${movie.Title} Poster">
                <h3>${movie.Title}</h3>
            </div>
        `;
        carouselRow.insertAdjacentHTML("beforeend", movieCard);
    });
}

function initializeCarousels() {
    populateCarousel("Avengers", "trendingNow");
    populateCarousel("Batman", "topPicks");
}

document.addEventListener("DOMContentLoaded", initializeCarousels);

