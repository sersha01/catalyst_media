from django.urls import path
from . import views
from .views import MyTokenObtainPairView


urlpatterns = [
    path('signup', views.UserWallet.as_view(), name='signup'),
    path('retrieve', views.UserWallet.as_view(), name='rretrieve'),
    path('update', views.UserWallet.as_view(), name='update'),
    path('token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]