const searchMovie = () => {
    const searchInput = document.getElementById('search').value;
    const resultsDiv = document.getElementById('results');
    const apiKey = '96199a19'; 
    const youtubeApiKey = 'AIzaSyB-KOgMNLdDQQFeS5S5maRtHXWzihjuLXc'; 
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchInput)}`;

    if (searchInput === '') {
        resultsDiv.innerHTML = '<p>Please enter a movie name!</p>';
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                resultsDiv.innerHTML = data.Search.map(movie => `
                    <div class="movie">
                        <h2>${movie.Title} (${movie.Year})</h2>
                        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'no-image.jpg'}" alt="${movie.Title}">
                        <p><strong>Type:</strong> ${movie.Type}</p>
                        <div id="info-${movie.imdbID}"></div>
                        <div id="trailer-${movie.imdbID}"></div>
                        <button onclick="fetchMovieInfo('${movie.imdbID}', 'info-${movie.imdbID}')">Show Info</button>
                        <button onclick="fetchTrailer('${movie.Title}', 'trailer-${movie.imdbID}')">Watch Trailer</button>
                    </div>
                `).join('');
            } else {
                resultsDiv.innerHTML = `<p>${data.Error}</p>`;
            }
        })
        .catch(error => {
            resultsDiv.innerHTML = `<p>Something went wrong! Please try again later.</p>`;
            console.error('Error fetching movie data:', error);
        });
};

const fetchMovieInfo = (imdbID, infoDivId) => {
    const apiKey = '96199a19'; 
    const movieDetailsUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=short`;

    fetch(movieDetailsUrl)
        .then(response => response.json())
        .then(data => {
            const infoDiv = document.getElementById(infoDivId);
            if (data.Response === 'True') {
                infoDiv.innerHTML = `
                    <p><strong>Plot:</strong> ${data.Plot}</p>
                    <p><strong>Director:</strong> ${data.Director}</p>
                    <p><strong>Actors:</strong> ${data.Actors}</p>
                    <p><strong>Genre:</strong> ${data.Genre}</p>
                    <p><strong>Rating:</strong> ${data.imdbRating}/10</p>
                `;
            } else {
                infoDiv.innerHTML = `<p>${data.Error}</p>`;
            }
        })
        .catch(error => {
            const infoDiv = document.getElementById(infoDivId);
            infoDiv.innerHTML = '<p>Error fetching movie information.</p>';
            console.error('Error fetching movie info:', error);
        });
};

const fetchTrailer = (movieTitle, trailerDivId) => {
    const youtubeApiKey = 'AIzaSyB-KOgMNLdDQQFeS5S5maRtHXWzihjuLXc'; 
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(movieTitle)}+trailer&type=video&key=${youtubeApiKey}`;

    fetch(youtubeApiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const videoId = data.items[0].id.videoId;
                const trailerDiv = document.getElementById(trailerDivId);
                trailerDiv.innerHTML = `
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `;
            } else {
                const trailerDiv = document.getElementById(trailerDivId);
                trailerDiv.innerHTML = '<p>No trailer found for this movie.</p>';
            }
        })
        .catch(error => {
            const trailerDiv = document.getElementById(trailerDivId);
            trailerDiv.innerHTML = '<p>Error fetching trailer.</p>';
            console.error('Error fetching YouTube trailer:', error);
        });
};

document.getElementById('search-btn').addEventListener('click', searchMovie);
