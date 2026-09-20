import { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { getFavorites } from "../services/userMoviesApi";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import { useMovieLists } from "../context/MovieListsContext";

function Favorite() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const { watchlistIds, handleFavoriteChange, handleWatchlistChange } =
		useMovieLists();

	const handleRemoveFavorite = (movieId) => {
		setMovies((current) => current.filter((movie) => movie.id !== movieId));
		handleFavoriteChange(movieId, false); // keep shared context in sync
	};

	const loadMovies = async () => {
		try {
			setLoading(true);
			setError("");
			const token = localStorage.getItem("accessToken");
			if (!token) {
				setError("Please login to view your favorite movies.");
				setMovies([]);
				return;
			}

			const favoriteMovies = await getFavorites();
			setMovies(favoriteMovies);
		} catch (error) {
			setError(error.message || "Failed to load favorite movies.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadMovies();
	}, []);

	return (
		<div className="bg-dark">
			<Header />
			<div className="container my-5">
				<h1 className="text-center text-primary mb-5">Favorite Movies</h1>
				{loading && (
					<div className="text-center my-5">
						<div className="spinner-border text-primary" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
						<p className="mt-3 text-white">Loading your favorite movies...</p>
					</div>
				)}

				{!loading && error && (
					<ErrorState message={error} onRetry={loadMovies} />
				)}
			</div>

			{!loading && !error && movies.length === 0 && (
				<EmptyState
					icon="bi-heart"
					title="Your Favorites are empty"
					message="Movies you add to Favorites will appear here."
				/>
			)}

			{!loading && !error && movies.length > 0 && (
				<div className="row row-cols-1 row-cols-md-2 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mx-3">
					{movies.map((movie) => (
						<Cards
							key={movie.id}
							movie={movie}
							onRemove={handleRemoveFavorite}
							isFavorite={true}
							isWatchlist={watchlistIds.includes(movie.id)}
							onWatchlistChange={handleWatchlistChange}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default Favorite;
