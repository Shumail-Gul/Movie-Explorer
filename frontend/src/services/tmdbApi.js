
const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/api`
async function apiRequest(endpoint, signal) {
    
    const response = await fetch(
        `${BASE_URL}${endpoint}`, {signal})

        if(!response.ok){
            throw new Error(`Failed to fetch movies: " ${response.status}`)
    }

        const data = await response.json()

        

        return data
    
    
}

export async function getPopularMovies(page = 1, signal) {
   
    return apiRequest(`/movies/popular/?page=${page}`, signal);
}

export async function getTopRatedMovies(page = 1, signal) {
	return apiRequest(`/movies/top-rated/?page=${page}`, signal);
}

export async function getTrendingMovies(page = 1, signal) {
	return apiRequest(`/movies/trending/?page=${page}`, signal);
}

export async function getMovieDetails(id, signal) {
	return apiRequest(`/movie/${id}`, signal);
}

export async function SearchMovies(query, page = 1, signal) {
	return apiRequest(
		`/movies/search/?query=${encodeURIComponent(query)}&page=${page}`,
		signal
	);
}

export async function getMovieVideos(id, signal) {
	return apiRequest(`/movie/${id}/videos`, signal);
}

export async function getSimilarMovies(id, signal) {
	return apiRequest(`/movie/${id}/similar`, signal);
}