from django.db import models
from django.contrib.auth.models import User

class Favorite(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="favorites"
    )

    movie_id = models.IntegerField()
    movie_title = models.CharField(max_length=255)
    
    poster_path = models.CharField(max_length=255, blank=True, null=True)
    release_date = models.CharField(max_length=50,blank=True, null=True)
    rating = models.FloatField(null=True, blank=True)
    

    class Meta:
        unique_together = ("user", "movie_id")

        constraints = [
            models.UniqueConstraint(
                fields=["user", "movie_id"],
                name="unique_user_favorite"

            )
        ]

    def __str__(self):
        return f"{self.user.username} - {self.movie_title}"



class Watchlist(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="watchlist"
    )

    movie_id = models.IntegerField()
    movie_title = models.CharField( max_length=255)
    poster_path = models.CharField(max_length=500, null=True, blank=True)
    release_date = models.CharField(max_length=50,blank=True, null=True)
    rating = models.FloatField(null=True, blank=True)


    class Meta:
        unique_together = ("user", "movie_id")
        constraints = [
            models.UniqueConstraint(
                fields=["user", "movie_id"],
                name="unique_user_watchlist"
            )
        ]

    def __str__(self):
      return f"{self.user.username} - {self.movie_title}"
  


# Create your models here.
