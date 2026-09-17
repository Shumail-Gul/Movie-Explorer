import {
	useState,
	useEffect,
	useCallback,
	useContext,
	createContext,
} from "react";
import { getFavorites, getWatchlist } from "../services/userMoviesApi";

const MovieListsContext = createContext(null);

export function MovieListsProvider({ children }) {
	const [favoriteIds, setFavoriteIds] = useState([]);
	const [watchlistIds, setWatchListIds] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const refresh = useCallback(async () => {
		const token = localStorage.getItem("accessToken");

		if (!token) {
			setFavoriteIds([]);
			setWatchListIds([]);
			setLoaded(true);
			return;
		}

		try {
			const [favorites, watchlist] = await Promise.all([
				getFavorites(),
				getWatchlist(),
			]);
			setFavoriteIds(
				favorites.map((movie) => Number(movie.id ?? movie.movie_id)),
			);
			setWatchListIds(
				watchlist.map((movie) => Number(movie.id ?? movie.movie_id)),
			);
		} catch (error) {
			alert("Failed to load user lists: ", error);
		} finally {
			setLoaded(true);
		}
	}, []);

	useEffect(() => {
		refresh();
	}, [refresh]);

	const handleFavoriteChange = useCallback((movieId, added) => {
		setFavoriteIds((current) =>
			added ? [...current, movieId] : current.filter((id) => id !== movieId),
		);
	}, []);

	const handleWatchlistChange = useCallback((movieId, added) => {
		setWatchListIds((current) =>
			added ? [...current, movieId] : current.filter((id) => id !== movieId),
		);
	}, []);

	return (
		<MovieListsContext.Provider
			value={{
				favoriteIds,
				watchlistIds,
				loaded,
				refresh,
				handleFavoriteChange,
				handleWatchlistChange,
			}}
		>
			{children}
		</MovieListsContext.Provider>
	);
}

export const useMovieLists = () => useContext(MovieListsContext);
