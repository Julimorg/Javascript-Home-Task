const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


getMovies();

async function getMovies() {
    // Check if movies are stored in localStorage
    const storedMovies = localStorage.getItem('movies');

    if (storedMovies) {
        // If stored, use the local data
        const data = JSON.parse(storedMovies);
        showMovies(data.results);
    } else {
        const res = await fetch(API_URL);
        const data = await res.json();
        localStorage.setItem('movies', JSON.stringify(data));

        showMovies(data.results);
    }
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        // Perform search on stored data
        searchMovies(searchTerm);
    } else {
        window.location.reload();
    }
});

function searchMovies(query) {
    const storedMovies = localStorage.getItem('movies');

    if (storedMovies) {
        const data = JSON.parse(storedMovies);
        const filteredMovies = data.results.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
        showMovies(filteredMovies);
    } else {
        alert('No movie data found!');
    }
}
