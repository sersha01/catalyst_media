from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password
from .models import Wallet, Transaction
from .serializers import TransactionSerializer, MyTokenObtainPairSerializer
from .permissions import UserPermission


# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    # queryset = Wallet.objects.all()

class UserWallet(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if Wallet.objects.filter(email=email).exists():
            return Response({'success': False, 'message': 'User already exists'})
        else:
            Wallet.objects.create(email=email,password=make_password(password))
            return Response({'success': True, 'message': 'User created'})
            
    @permission_classes((UserPermission,))
    def get(self, request):
        try:
            wallet = Wallet.objects.get(email=request.user.email)
            transactions = Transaction.objects.filter(wallet=wallet)
            return Response({"transactions":TransactionSerializer(transactions, many=True).data, "balance":wallet.balance})
        except:
            return Response({'users':[]})
        
    @permission_classes((UserPermission,))
    def patch(self, request):
        amount = float(request.data.get('amount'))
        status = request.data.get('status')
        wallet = Wallet.objects.get(email=request.user.email)
        if status == "Debit":
            amount *= -1
        wallet.balance += amount
        wallet.save()

        Transaction.objects.create(wallet=wallet, amount=amount)
        transactions = Transaction.objects.filter(wallet=wallet)
        return Response({"transactions":TransactionSerializer(transactions, many=True).data, "balance":wallet.balance})