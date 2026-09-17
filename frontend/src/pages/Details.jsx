import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieVideos, getSimilarMovies } from "../services/tmdbApi";
import Header from "../components/Header";
import Cards from "../components/Cards"
import {useMovieLists} from "../context/MovieListsContext"
import { TrailerEmbed } from "../components/TrailerEmbed";

function Details({imageloading = "lazy"}) {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [trailer, setTrailer] = useState(null);
	const [similarMovies, setSimilarMovies] = useState([])


	

		const {favoriteIds, watchlistIds, handleFavoriteChange, handleWatchlistChange} = useMovieLists()


	useEffect(() => {
		const controller = new AbortController()
		async function MovieDetail() {
			try {
				const data = await getMovieDetails(id, controller.signal);
				setMovie(data);

				const videoData = await getMovieVideos(id, controller.signal);
				const officialTrailer = videoData?.results?.find(
					(video) =>
						(video.type === "Trailer" || video.type === "Teaser") &&
						video.site === "YouTube",
				);
				setTrailer(officialTrailer || null);

				const SimilarData = await getSimilarMovies(id, controller.signal);
				setSimilarMovies(SimilarData?.results || []);

		
			} catch (error) {
				if(error.name === "AbbortError") return;
			}

			
		}
		MovieDetail();

		return () => controller.abort()

		
		
	}, [id]);

	

	if (!movie) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-black text-light">
			<Header />

			<main className="container my-5 bg-black text-light">
				{/* Top Navigation */}
				<div className="mb-4">
					<Link
						to="/"
						className="btn btn-outline-warning btn-sm px-4 rounded-pill fw-semibold"
					>
						&larr; Back To Home
					</Link>
				</div>

				{/* Hero Section: Details & Poster */}
				<div className="row g-4 align-items-start mb-5">
					{/* Main Info */}
					<div className="col-lg-8 order-2 order-lg-1">
						<h1 className="display-4 fw-bold text-start text-primary mb-2">
							{movie.title}
						</h1>

						{movie.tagline && (
							<p className="fst-italic text-secondary fs-5 mb-4">
								{movie.tagline}
							</p>
						)}

						{/* Quick Metadata Badges */}
						<div className="d-flex flex-wrap gap-4 bg-light border rounded p-3 mb-4 text-dark align-items-center">
							<div className="d-flex  align-items-center gap-2">
								<i className="bi bi-star-fill text-primary  fs-5" />
								<span className="fw-bold">
									{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
								</span>{" "}
								/ 10
							</div>
							<div className="d-flex align-items-center gap-2">
								<i className="bi bi-calendar3 text-primary fs-5" />
								<span>{movie.release_date}</span>
							</div>
							<div className="d-flex align-items-center gap-2">
								<i className="bi bi-hourglass-split  fs-5 text-primary" />
								<span>{movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
							</div>
						</div>

						{/* Overview */}
						<div>
							<h4 className="fw-bold  mb-2">Overview</h4>
							<p className="lead text-light fs-6 lh-lg">{movie.overview}</p>
						</div>
					</div>

					{/* Poster Image */}
					<div className="col-lg-4 order-1 order-lg-2 text-center">
						{movie.poster_path ? (
							<img
								src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
								loading={imageloading}
								decoding="async"
								// width="342"
								// height="513"
								alt={movie.title}
								className="img-fluid rounded-3 shadow-lg w-100"
								// style={{  objectFit: "cover" }}
							/>
						) : (
							<div className="bg-secondary text-white rounded p-5">
								No Poster Available
							</div>
						)}
					</div>
				</div>

				{/* Media Trailer Section */}
				{trailer && (
					<section className="mt-5 border-top pt-5">
						<h3 className="fw-semibold text-primary  mb-4 text-center">
							Official Trailer
						</h3>
						<div className="row justify-content-center">
							<div className="col-lg-10">
								

								<TrailerEmbed videoKey={trailer.key} title={trailer.name}/>
							</div>
						</div>
					</section>
				)}

				{similarMovies.length > 0 && (
					<section className="mt-5 border-top pt-5">
						<h3 className="fw-semibold mb-4 text-center text-primary">
							Similar Movies
						</h3>
						<div
							className="row row-cols-1 row-cols-md-2
          row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 "
						>
							{similarMovies.slice(0, 8).map((movie) => (
								<Cards
									key={movie.id}
									isFavorite={favoriteIds.includes(movie.id)}
									isWatchlist={watchlistIds.includes(movie.id)}
									movie={movie}
									onFavoriteChange={handleFavoriteChange}
									onWatchlistChange={handleWatchlistChange}
								/>
							))}
						</div>
					</section>
				)}
			</main>
		</div>
	);
}

export default Details;