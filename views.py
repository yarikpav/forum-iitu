from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Section, Topic, Post
from .serializers import SectionSerializer, TopicSerializer, PostSerializer
from django.shortcuts import get_object_or_404

from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})
    else:
        return Response({"error": "Неверные данные"}, status=400)


@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Введите имя пользователя и пароль"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Пользователь уже существует"}, status=400)

    user = User.objects.create_user(username=username, password=password)
    token, _ = Token.objects.get_or_create(user=user)

    return Response({"token": token.key})

# --- Разделы ---
@api_view(["GET"])
def get_sections(request):
    sections = Section.objects.all()
    serializer = SectionSerializer(sections, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_section(request, section_id):
    try:
        section = Section.objects.get(id=section_id)
    except Section.DoesNotExist:
        return Response({"error": "Раздел не найден"}, status=404)
    serializer = SectionSerializer(section)
    return Response(serializer.data)

# --- Темы ---
@api_view(["GET"])
def get_topics(request, section_id):
    topics = Topic.objects.filter(section_id=section_id)
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_topic(request, section_id):
    section = get_object_or_404(Section, id=section_id)
    title = request.data.get("title")
    description = request.data.get("description")

    topic = Topic.objects.create(
        section=section,
        title=title,
        description=description,
        author=request.user
    )

    return Response({
        "id": topic.id,
        "title": topic.title,
        "description": topic.description,  # 🔹 добавляем описание
        "author__username": topic.author.username
    })


# --- Сообщения ---
@api_view(["GET"])
def get_posts(request, topic_id):
    posts = Post.objects.filter(topic_id=topic_id)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_post(request, topic_id):
    content = request.data.get("content")
    if not content:
        return Response({"error": "Текст сообщения обязателен"}, status=400)
    post = Post.objects.create(
        topic_id=topic_id,
        content=content,
        author=request.user
    )
    serializer = PostSerializer(post)
    return Response(serializer.data)
