from django.db import models
from django.contrib.auth.models import AbstractUser


class Wallet(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    balance = models.FloatField(default=0)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

class Transaction(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.wallet.email