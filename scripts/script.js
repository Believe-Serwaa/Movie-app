
const apiKey = '33062660215aeee323b20c67742bfdcb'; 
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    fetchMovies(query);
});

async function fetchMovies(query) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/343611?api_key=33062660215aeee323b20c67742bfdcb`);
    const data = await response.json();
    displayResults(data.results);
}

function displayResults(movies) {
    resultsDiv.innerHTML = ''; // Clear previous results
    if (movies.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }
    
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <h3>${movie.title} (${movie.release_date.split('-')[0]})</h3>
            <p>Rating: ${movie.vote_average}</p>
            <p>${movie.overview}</p>
        `;
        resultsDiv.appendChild(movieDiv);
    });
}
