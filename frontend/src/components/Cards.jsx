import { Link,  useNavigate } from "react-router-dom"
import {
	addFavorite,
	addWatchList,
	removeWatchlist,
	removeFavorite,
} from "../services/userMoviesApi";
import React, { useState } from "react";
import  Toast  from "./Toast";
function Cards({movie, onRemove, isFavorite = false, isWatchlist= false, onFavoriteChange, onWatchlistChange, imageloading="lazy"}) {
    const navigate = useNavigate()
	const [favoriteProcessing, setFavoriteProcessing] = useState(false)
	const [watchlistProcessing, setWatchlistProcessing]
 = useState(false)
	const movieId = Number(movie.id || movie.movie_id)
	const isFavoriteListed = isFavorite;
	const isWatchListed = isWatchlist;
	const [toast, setToast] = useState(null)




const index = 0
	const handleFavorite = async() => {
        const token = localStorage.getItem("accessToken");
		if(!token){
			setToast({
				message :"Please Login first.",
				type: "warning"
			})
			setTimeout(() => {
				navigate("/login")
			}, 1200);
			return
		}
		if (favoriteProcessing) return
       try{
		setFavoriteProcessing(true)
		if(isFavoriteListed){
			await removeFavorite(movieId)

            onFavoriteChange?.(movieId, false);
			setToast({
				message: "Removed from favorites.",
				type: "warning",
			});

			if(onRemove){
				onRemove(movieId, "favorite")
			}
		}else{
			await addFavorite(movie)
            onFavoriteChange?.(movieId, true);

			setToast({
				message: "Added To favorites.",
				type: "success",
			});

		}

	   } catch(error){
		console.log("Favorite Error: ", error)
	   } finally {
		setFavoriteProcessing(false)
	   }
		
	}

	

	const handleWatchList = async () => {
		const token = localStorage.getItem("accessToken")

		if(!token){
			setToast({
				message: "Please Login first.",
				type: "warning",
			});
			setTimeout(() => {
				navigate("/login");
			}, 1200);
			return;
		}
		if(watchlistProcessing) return 
     try{
		setWatchlistProcessing(true)
		if(isWatchListed){
			await removeWatchlist(movieId)
			onWatchlistChange?.(movieId, false)

			setToast({
				message: "Removed from watchlist.",
				type: "warning",
			});

			if (onRemove){
				onRemove(movieId, "watchlist")
			}
		}else{
			await addWatchList(movie);
			onWatchlistChange?.(movieId, true);
			setToast({
				message: "Added To Watchlist.",
				type: "success",
			});

		}
	 }
	 catch(error){
		console.log("Watchlist error:", error);

	 } finally {
		setWatchlistProcessing(false)
	 }

	}
  


  
  return (
	
		<div className="col">
			<div className="card bg-dark text-light p-2 shadow-lg h-100">
				<img
					src={`https://image.tmdb.org/t/p/w342${movie.poster_path}
					`}
					fetchPriority={index === 0 ? "high" : "auto"}
					alt={movie.title}
					className="card-img-top"
					loading={imageloading}
					decoding="async"
					// width="342"
					// height="513"
				/>
				<div className="card-body d-flex flex-column p-2">
					<h5 className="card-title text-danger fw-bold">
						{movie.title || movie.movie_title}
					</h5>
					<p className="card-text">{movie.overview}</p>
					<p className="fw-normal">
						<i className="bi bi-star-fill fs-6 text-warning p-1 " />
						Rating:{" "}
						{movie.vote_average !== undefined
							? movie.vote_average.toFixed(1)
							: movie.rating !== undefined
								? Number(movie.rating).toFixed(1)
								: "N/A"}
					</p>

					<p className="fw-normal">
						<i className="bi bi-calendar3 fs-6 text-primary p-1 "></i>Release
						Date: {movie.release_date || "N/A"}
					</p>
					<div className="d-flex justify-content-between align-items-center mt-auto ">
						<Link
							to={`/details/${movie.id || movie.movie_id}`}
							className="btn  btn-danger fw-bold px-4 text-white" aria-label="button for details"
						>
							More...
						</Link>
						<div className="btn-group ">
							<button
								className="btn " aria-label="button for favorites"
								onClick={handleFavorite}
								disabled={favoriteProcessing}
							>
								<i
									className={`bi  fs-3 ${
										favoriteProcessing
											? "bi-hourglass-split"
											: isFavoriteListed
												? "bi-heart-fill text-danger "
												: "bi-heart text-warning"
									}`}
								></i>
							</button>
							<button
								className="btn " aria-label="button for watchlist"
								onClick={handleWatchList}
								disabled={watchlistProcessing}
							>
								<i
									className={`bi  fs-3 ${
										watchlistProcessing
											? "bi-hourglass-split"
											: isWatchListed
												? "bi-bookmark-fill text-primary "
												: "bi-bookmark-plus text-warning"
									}`}
								></i>
							</button>
						</div>
					</div>
				</div>
			</div>
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(null)}
				/>
			)}
		</div>
	);
}

export default React.memo(Cards)
