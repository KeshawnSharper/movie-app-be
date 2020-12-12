from django.contrib import admin
from django.urls import path, include
from core.views import TestView
from core.views import FacebookLogin
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TestView.as_view(),name='TestView'),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login')
]
