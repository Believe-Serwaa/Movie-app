
/*const apiKey = '96199a19'; 
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    fetchMovies(query);
});

async function fetchMovies(query) {
   const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=96199a19`);
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
}*/





/*// TMDB API endpoint and API key
const apiUrl= 'http://www.omdbapi.com/?i=tt3896198&apikey=96199a19';
const apikey = '96199a19'; 

// Select DOM elements
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-btn');
const resultsDiv = document.getElementById('results');

// Add event listener to search button
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();

  // Check if search term is not empty
  if (searchTerm) {
    // Construct API URL with search term and API key
    const url = `${apiUrl}?api_key=${apikey}&query=${searchTerm}`;

    // Fetch data from TMDB API
    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=96199a19')
      .then(response => response.json())
      .then(data => {
        // Clear previous results
        resultsDiv.innerHTML = '';

        // Display search results
        data.results.forEach(movie => {
          const movieDiv = document.createElement('div');
          movieDiv.innerHTML = `
            <h2>${movie.title} (${movie.release_date.substring(0, 4)})</h2>
            <p>${movie.overview}</p>
          `;
          resultsDiv.appendChild(movieDiv);
        });
      })
      .catch(error => console.error('Error:', error));
  }
});*/



fetch(
    "http://www.omdbapi.com/?i=tt3896198&apikey=96199a19"
  )
    .then(function (response) {
      console.log(response.body);
      return response.json();
    })
