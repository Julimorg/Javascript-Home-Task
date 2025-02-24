const movieApi = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const imgPath = 'https://image.tmdb.org/t/p/w1280';

const movie_grid = document.querySelector(".movie-grid");
const form = document.getElementById("form");
const search = document.getElementById("search");

document.addEventListener("DOMContentLoaded", function () {
    getMovies();
    filterMostViewMovie();
    filterfewViewMovie();
});

//? Fetching  API
async function getMovies() {
    // Check if movies are stored in localStorage
    const storedMovies = localStorage.getItem('movies');

    if (storedMovies) {
        // If stored, use the local data
        const data = JSON.parse(storedMovies);
        showMovies(data.results);
    } else {
        try {
            const res = await fetch(movieApi);  
            if (!res.ok) {
                throw new Error("Failed to fetch movies");
            }
            
            // Call the function to attach the event listener
            const data = await res.json();
            localStorage.setItem('movies', JSON.stringify(data));

            showMovies(data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }
}

//? Display Movie in DOM
function showMovies(movies) {
    movie_grid.innerHTML = ''; 

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        <img src="${imgPath + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${overview}</p>
        </div>
    `;
        movie_grid.appendChild(movieEl); 
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

//? Search function
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

//? Filter by Largest View based on vote_count 
function filterMostViewMovie()
{
    const mostViewBtn = document.getElementById("mostView");
    mostViewBtn.addEventListener("click", () => {
        const storedMovies = localStorage.getItem('movies');
    
        if (storedMovies) {
            const data = JSON.parse(storedMovies);
            const filteredMovies = data.results.filter(movie => movie.vote_count > 1500);
            showMovies(filteredMovies);
        } else {
            alert("No movie data found!");
        }
    });
}


//? Filter by Largest View based vote_count
function filterfewViewMovie()
{
    const fewViewBtn = document.getElementById("fewView");
fewViewBtn.addEventListener("click",() => {
    const storedMovies = localStorage.getItem('movies');
    
    if (storedMovies) {
        const data = JSON.parse(storedMovies);
        const filteredMovies = data.results.filter(movie => movie.vote_count <= 1500);
        showMovies(filteredMovies);
    } else {
        alert("No movie data found!");
    }
})
}