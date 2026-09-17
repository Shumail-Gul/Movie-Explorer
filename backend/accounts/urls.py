from django.urls import path

from .views import (RegisterView, LoginView, WatchlistView, FavoriteView, popular_movies,
top_rated_movies,
trending_movies,
search_movies,
get_movie_videos,
get_similar_movies,
get_movie_details)

from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="resgister"),
    path("login/", LoginView.as_view(), name="login"),
    path("favorites/", FavoriteView.as_view(), name="favorites"),
    path("watchlist/", WatchlistView.as_view(), name="watchlist"),
        path("movies/popular/", popular_movies),
    path("movies/top-rated/", top_rated_movies),
    path("movies/trending/", trending_movies),
    path("movies/search/", search_movies),

    path("movie/<int:movie_id>/", get_movie_details),
    path("movie/<int:movie_id>/videos", get_movie_videos),
    path("movie/<int:movie_id>/similar", get_similar_movies)

]
