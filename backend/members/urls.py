from members.models import Member
from django.urls import path
from .views import MemberList, MemberDetail

urlpatterns = [
    path('<int:pk>/', MemberDetail.as_view()),
    path('', MemberList.as_view()),
]
