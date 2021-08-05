from .models import Member
from rest_framework import serializers

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'birth', 'clubName')
        model = Member
