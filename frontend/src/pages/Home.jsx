import {
	getPopularMovies,
	SearchMovies,
	getTrendingMovies,
	getTopRatedMovies,
} from "../services/tmdbApi";
import Header from "../components/Header";
import Search from "../components/Search";
import Cards from "../components/Cards";
import { useEffect, useState, useCallback, useRef } from "react";
import { useMovieLists } from "../context/MovieListsContext";

function Home() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [category, setCategory] = useState("top_rated");

	const {
		favoriteIds,
		watchlistIds,
		handleFavoriteChange,
		handleWatchlistChange,
	} = useMovieLists();

	const abortControllerRef = useRef(null);

	const loadMovies = async (selectedCategory, selectedPage = 1, query = "") => {
		if (abortControllerRef.current) abortControllerRef.current.abort();
		const controller = new AbortController();
		abortControllerRef.current = controller;

		try {
			setLoading(true);
			setError("");
			let data;
			if (query.trim()) {
				data = await SearchMovies(query, selectedPage, controller.signal);
			} else if (selectedCategory === "top_rated") {
				data = await getTopRatedMovies(selectedPage, controller.signal);
			} else if (selectedCategory === "popular") {
				data = await getPopularMovies(selectedPage, controller.signal);
			} else {
				data = await getTrendingMovies(selectedPage, controller.signal);
			}
			setMovies(data.results || []);
			setPage(data.page || selectedPage);
			setTotalPages(data.total_pages || 1);
		} catch (error) {
			if (error.name === "AbortError") return;
			setError(error.message || "Failed to load movies.");
			setMovies([]);
		} finally {
			if (!controller.signal.aborted) setLoading(false);
		}
	};

	const handleSearch = useCallback(
		async (query) => {
			setSearchQuery(query);
			setPage(1);
			await loadMovies(category, 1, query);
		},
		[category],
	);

	const handleNextPage = () => {
		if (page < totalPages) {
			loadMovies(category, page + 1, searchQuery);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const handlePreviousPage = () => {
		if (page > 1) {
			loadMovies(category, page - 1, searchQuery);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	useEffect(() => {
		loadMovies("top_rated", 1);
	}, []);

	async function handleCategory(selectedCategory) {
		setCategory(selectedCategory);
		setSearchQuery("");
		setPage(1);
		await loadMovies(selectedCategory, 1);
	}

	return (
		<main className=" bg-dark text-light">
			<Header />
			<Search onSearch={handleSearch} onCategoryChange={handleCategory} />
			<div className="container-fluid px-4 px-md-5 my-4">
				{loading ? (
					<div className="text-center my-5">
						<div className="spinner-border text-primary" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
						<p className="mt-3 text-white">Loading Movies...</p>
					</div>
				) : error ? (
					<div className="alert alert-danger text-center mt-5">{error}</div>
				) : movies.length === 0 ? (
					<div className="text-center my-5">
						<i className="bi bi-film fs-1 text-muted"></i>
						<h4 className="mt-3">No result Found.</h4>
						<p className="text-muted">Try searching for another movie.</p>
					</div>
				) : (
						<div className="row row-cols-1 row-cols-md-2 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 my-3">
							{movies.map((movie, index) => (
								<Cards
									key={movie.id}
									imageloading={index < 4 ? "eager" : "lazy"}
									isFavorite={favoriteIds.includes(movie.id)}
									isWatchlist={watchlistIds.includes(movie.id)}
									movie={movie}
									onFavoriteChange={handleFavoriteChange}
									onWatchlistChange={handleWatchlistChange}
								/>
							))}
						</div>
					
				)}
			</div>
			{!loading && movies.length > 0 && (
				<div className="d-flex justify-content-center align-items-center gap-3 my-5">
					<button
						className="btn btn-outline-primary"
						onClick={handlePreviousPage}
						disabled={loading || page === 1}
					>
						← Previous
					</button>
					<span className="fw-semibold">
						Page {page} of {totalPages}
					</span>
					<button
						className="btn btn-primary"
						onClick={handleNextPage}
						disabled={loading || page === totalPages}
					>
						Next →
					</button>
				</div>
			)}
			{/* <Footer />/ */}
		</main>
	);
}

export default Home;
