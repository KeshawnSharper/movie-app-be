from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
# Create your views here.
from .serializers import PostSerializer
from .models import Post

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class TestView(APIView):
    # permission_classes = (IsAuthenticated, )

    def get(self,request,*args,**kwargs):
        qs = Post.objects.all()
        # post = qs.first()
        serializer = PostSerializer(qs, many=True)
        # serializer = PostSerializer(post)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
