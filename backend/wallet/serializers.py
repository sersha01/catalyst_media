from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Wallet, Transaction
# from django.contrib.auth.hashers import check_password


class TransactionSerializer(serializers.ModelSerializer):
    wallet = serializers.CharField(source='wallet.email')
    date = serializers.DateTimeField(format='%d/%m/%Y - %H:%M')
    class Meta:
        model = Transaction
        fields = '__all__'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        
        return token