from rest_framework import serializers
from .models import Section, Topic, Post

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = "__all__"


class TopicSerializer(serializers.ModelSerializer):
    author__username = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Topic
        fields = ["id", "title", "author__username", "created_at", "section"]


class PostSerializer(serializers.ModelSerializer):
    author__username = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Post
        fields = ["id", "content", "author__username", "created_at", "topic"]
