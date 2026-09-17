
export function getWatchList() {
  const watchlist = localStorage.getItem("watchlist");

  return watchlist ? JSON.parse(watchlist) : []
}

export function AddToWatchList(movie){
  const watchlist = getWatchList()

  const alreadyExist = watchlist.some((item) => item.id === movie.id);

  if(!alreadyExist){
    watchlist.push(movie)

    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist)
    )
  }
}

export function removeFromWatchList(movieId){
  const watchlist = getWatchList()

  const updateWatchList = watchlist.filter((movie) => movie.id !== movieId)

  localStorage.setItem("watchlist",
    JSON.stringify(updateWatchList)
  )
}

