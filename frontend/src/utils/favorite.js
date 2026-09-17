export function getFavoriteMovies (){
    const favorite = localStorage.getItem("favoriteList")

    return favorite ? JSON.parse(favorite) : []

}

export function AddToFavorite(movie){
    const favorite = getFavoriteMovies()

    const alreadyExist = favorite.some((item) => item.id === movie.id)

    if(!alreadyExist){
        favorite.push(movie)

        localStorage.setItem("favoriteList", JSON.stringify(favorite))
    }
}

export function RemoveFromFavorite(movieId){
    const favorite = getFavoriteMovies()
    const updateFavoriteList = favorite.filter((movie) => movie.id !== movieId)

    localStorage.setItem("favoriteList", JSON.stringify(updateFavoriteList))
}