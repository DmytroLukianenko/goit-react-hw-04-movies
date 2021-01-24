const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `980ba820651dea2643403287e166df37`;

async function fetchByURL(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function getTrendingData() {
    const url = `${BASE_URL}/trending/movie/day?api_key=${KEY}&language=en-US`;
    return fetchByURL(url);
}

function getSearchData(query) {
    const url = `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&query=${query}`;
    return fetchByURL(url);
}

function getMovieById(id) {
    const url = `${BASE_URL}/movie/${id}?api_key=${KEY}&language=en-US`;
    return fetchByURL(url);
}

function getMovieCast(id) {
    const url = `${BASE_URL}/movie/${id}/credits?api_key=${KEY}&language=en-US`;
    return fetchByURL(url);
}

function getMovieReviews(id) {
    const url = `${BASE_URL}/movie/${id}/reviews?api_key=${KEY}&language=en-US`;
    return fetchByURL(url);
}

const api = {
    getTrendingData,
    getSearchData,
    getMovieById,
    getMovieCast,
    getMovieReviews,
};

export default api;