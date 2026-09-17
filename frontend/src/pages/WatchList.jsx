import { useState, useEffect } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { getWatchlist } from "../services/userMoviesApi";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import { useMovieLists } from "../context/MovieListsContext";

function WatchList() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const { favoriteIds, handleFavoriteChange, handleWatchlistChange } =
		useMovieLists();

	const handleRemove = (movieId) => {
		setMovies((current) => current.filter((movie) => movie.id !== movieId));
		handleWatchlistChange(movieId, false); // keep shared context in sync
	};

	const loadMovies = async () => {
		try {
			setLoading(true);
			setError("");
			const token = localStorage.getItem("accessToken");
			if (!token) {
				setError("Please login to view your Watchlist movies.");
				setMovies([]);
				return;
			}

			const watchlistmovies = await getWatchlist();
			setMovies(watchlistmovies);
		} catch (error) {
			setError(error.message || "Failed to load watchlist movies.");
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
				<h1 className="text-center text-primary mb-5">Watchlist Movies</h1>
				{loading && (
					<div className="text-center my-5">
						<div className="spinner-border text-primary" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
						<p className="mt-3 text-muted">Loading your Watchlist movies...</p>
					</div>
				)}

				{!loading && error && (
					<ErrorState message={error} onRetry={loadMovies} />
				)}
			</div>

			{!loading && !error && movies.length === 0 && (
				<EmptyState
					icon="bi-bookmark"
					title="Your watchlist is empty."
					message="Movies you added to your watchlist will appear here"
				/>
			)}

			{!loading && !error && movies.length > 0 && (
				<div className="row row-cols-1 row-cols-md-2 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
					{movies.map((movie) => (
						<Cards
							key={movie.id}
							movie={movie}
							onRemove={handleRemove}
							isWatchlist={true}
							isFavorite={favoriteIds.includes(movie.id)}
							onFavoriteChange={handleFavoriteChange}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default WatchList;

