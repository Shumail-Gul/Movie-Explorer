from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegisterSerializer, LoginSerializer

from .models import Favorite, Watchlist
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication

from .tmdb_service import get_tmdb_data


class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "message" : "User registered successfully"
                },
                status=status.HTTP_201_CREATED

            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data= request.data)

        if serializer.is_valid():
            return Response(
                {
                    "message" : "Login successful",
                    "access" : serializer.validated_data["access"],
                    "refresh" : serializer.validated_data["refresh"],
                    "user": {
                        "id" : serializer.validated_data["user"].id,
                        "email" : serializer.validated_data["user"].email,
                        "username" : serializer.validated_data["user"].username,
                    },
                },

                status=status.HTTP_200_OK
                )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,

        )



class FavoriteView(APIView):
    authentication_classes = [JWTAuthentication]

    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = Favorite.objects.filter(user = request.user)

        data = [
            {
                "id" : favorite.movie_id,
                "title" : favorite.movie_title,
                "poster_path" : favorite.poster_path,
                "release_date" : favorite.release_date,
                "rating" : favorite.rating

            }
            for favorite in favorites
        ]

        return Response(data)


    def post(self, request):
        favorite, created = Favorite.objects.get_or_create(
            user = request.user,
            movie_id = request.data.get("movie_id"),
            defaults={
                "movie_title": request.data.get("movie_title"),
                "poster_path": request.data.get("poster_path"),
                "release_date" : request.data.get("release_date"),
                "rating" : request.data.get("rating")
            }

        )

        if not created:
            return Response(
              {"message" : "Movie already in favorites."},
              status=status.HTTP_400_BAD_REQUEST
            )


        return Response(
            {"message": "Movie added to favorites"},
            status=status.HTTP_201_CREATED
        )

    def delete(self, request):
        movie_id = request.data.get("movie_id")

        deleted, _ = Favorite.objects.filter(
            user=request.user,
            movie_id=movie_id
        ).delete()

        if deleted:
            return Response(
                {
                    "message" : "Movie removed from favorites."
                }
            )

        return Response(
            {"message" : "Movie not found in favorites."},
            status=status.HTTP_404_NOT_FOUND
        )


class WatchlistView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        watchlist= Watchlist.objects.filter(user=request.user)

        data = [
            {
                "id" : movie.movie_id,
                "title" : movie.movie_title,
                "poster_path" : movie.poster_path,
                "release_date" : movie.release_date,
                "rating" : movie.rating
            }

            for movie in watchlist
        ]

        return Response(data)


    def post(self, request):
        movie, created = Watchlist.objects.get_or_create(
            user = request.user,
            movie_id = request.data.get("movie_id"),
            defaults={
                "movie_title" : request.data.get("movie_title"),
                "poster_path" : request.data.get("poster_path"),
                "release_date" : request.data.get("release_date"),
                "rating" : request.data.get("rating")
            }
        )

        if not created:
            return  Response(
                {"message" : "movie already in watchlist."},
                status = status.HTTP_400_BAD_REQUEST
            )

        return  Response(
            {
                "message" : "Movie added to watchlist."
            },
            status=status.HTTP_201_CREATED
        )


    def delete(self, request):
        movie_id = request.data.get("movie_id")

        deleted, _ = Watchlist.objects.filter(user= request.user,
                                            movie_id=movie_id).delete()

        if deleted:
            return Response(
                {"message" : "movie removed from watchlist."}
            )

        return Response(
            {"message" : "Movie not found in watchlist."}
            ,
            status= status.HTTP_404_NOT_FOUND
        )
@api_view(["GET"])
@permission_classes([AllowAny])

def popular_movies(request):
    page = request.GET.get("page", 1)

    data = get_tmdb_data(
        "/movie/popular",
        {
            "page": page,
        }
    )

    return Response(data)


@api_view(["GET"])
@permission_classes([AllowAny])

def top_rated_movies(request):
    page = request.GET.get("page", 1)

    data = get_tmdb_data(
        "/movie/top_rated",
        {
            "page": page,
        }
    )

    return Response(data)

@api_view(["GET"])
@permission_classes([AllowAny])
def trending_movies(request):
    data = get_tmdb_data("/trending/movie/week")

    return Response(data)


@api_view(["GET"])
@permission_classes([AllowAny])

def search_movies(request):
    query = request.GET.get("query", "")
    page = request.GET.get("page", 1)

    data = get_tmdb_data(
        "/search/movie",
        {
            "query": query,
            "page": page,
        }
    )

    return Response(data)

@api_view(["GET"])
@permission_classes([AllowAny])
def get_movie_videos(request, movie_id):

    data = get_tmdb_data(
                f"/movie/{movie_id}/videos"
,


    )
    return Response(data)

@api_view(["GET"])
@permission_classes([AllowAny])

def get_similar_movies(request, movie_id):

    data = get_tmdb_data(
        f"/movie/{movie_id}/similar"

    )
    return Response(data)

@api_view(["GET"])
@permission_classes([AllowAny])

def get_movie_details(request, movie_id):

    data = get_tmdb_data(
        f"/movie/{movie_id}"

    )
    return Response(data)