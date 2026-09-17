
const API_URL = import.meta.env.VITE_API_URL;

const BASE_URL = `${API_URL}/api`;

async function apiRequest(endpoint, options = {}) {
	const token = localStorage.getItem("accessToken");

	let response;
try {
	response = await fetch(`${BASE_URL}${endpoint}`, {
		...options,

		headers: {
			"Content-Type": "application/json",

			...(token && {
				Authorization: `Bearer ${token}`,
			}),

			...options.headers,
		},
	});
} catch (error) {
	throw new Error("Unable to connect to the server. Please try again.", {
		cause: error
	});
}
	// 🔒 Token expired / invalid
	if (response.status === 401) {
		localStorage.removeItem("accessToken")
		localStorage.removeItem("refreshToken")
		localStorage.removeItem("user")
		window.dispatchEvent(new Event("authExpired"));

		throw new Error("Your session has expired. Please login again.");
	}

	// Try to read response
	let data = null;

	const text = await response.text();

	if (text) {
		try {
			data = JSON.parse(text);
		} catch {
			data = text;
		}
	}

	// ❌ Other errors
	if (!response.ok) {
		const message = data?.detail || data?.message || "Something went wrong.";

		throw new Error(message);
	}

	return data;
}

// =========================
// FAVORITES
// =========================

export async function getFavorites() {
	return await apiRequest("/favorites/", {
		method: "GET",
	});
}

export async function addFavorite(movie) {
	return await apiRequest("/favorites/", {
		method: "POST",

		body: JSON.stringify({
			movie_id: movie.id,
			movie_title: movie.title,
			poster_path: movie.poster_path,
			rating: movie.vote_average,
			release_date: movie.release_date,
		}),
	});
}

export async function removeFavorite(movieId) {
	return await apiRequest("/favorites/", {
		method: "DELETE",

		body: JSON.stringify({
			movie_id: movieId,
		}),
	});
}

// =========================
// WATCHLIST
// =========================

export async function getWatchlist() {
	return await apiRequest("/watchlist/", {
		method: "GET",
	});
}

export async function addWatchList(movie) {
	return await apiRequest("/watchlist/", {
		method: "POST",

		body: JSON.stringify({
			movie_id: movie.id,
			movie_title: movie.title,
			poster_path: movie.poster_path,
			rating: movie.vote_average,
			release_date: movie.release_date,
		}),
	});
}

export async function removeWatchlist(movieId) {
	return await apiRequest("/watchlist/", {
		method: "DELETE",

		body: JSON.stringify({
			movie_id: movieId,
		}),
	});
}