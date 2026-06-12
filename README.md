# IITU Forum

Форум‑платформа на **Django + React**, позволяющая создавать разделы, темы и посты.  
Проект разработан для учебных целей и демонстрации работы full‑stack интеграции.

---

## 🚀 Возможности
- Регистрация и авторизация пользователей (с токенами).
- Создание разделов и тем с описанием.
- Добавление постов в темы.
- REST API для взаимодействия с фронтендом.
- Интерфейс на React с Material UI.

---

## 🛠 Используемые технологии
- **Backend:** Django, Django REST Framework, SQLite/PostgreSQL
- **Frontend:** React, Axios, Material UI
- **Auth:** Django REST Framework Token Authentication

---

## ⚙️ Установка и запуск

### 1. Клонирование проекта
```bash
git clone https://github.com/yourusername/iitu_forum.git
cd iitu_forum
```
# Установка зависимостей (backend)
```bash
pip install -r requirements.txt
```
# Миграции базы данных
```bash
python manage.py makemigrations
python manage.py migrate
```
# Запуск сервера Django
```bash
python manage.py runserver
```
Сервер будет доступен по адресу: http://127.0.0.1:8000/api/

# Запуск фронтенда
```bash
cd frontend
npm install
npm start
```
Фронтенд будет доступен по адресу: http://localhost:3000/

# 🔗 API эндпоинты
POST /api/register/ — регистрация пользователя

POST /api/login/ — авторизация, получение токена

GET /api/sections/ — список разделов

GET /api/sections/<id>/ — информация о разделе

POST /api/sections/<id>/create_topic/ — создать тему

GET /api/sections/<id>/topics/ — список тем

POST /api/topics/<id>/create_post/ — создать пост

GET /api/topics/<id>/posts/ — список постов

# 📸 Примеры работы
Регистрация
``` bash
POST /api/register/
{
  "username": "yaroslav",
  "password": "12345"
}
```
Ответ:
```bash
{
  "token": "abc123..."
}
```
Создание темы
```bash
POST /api/sections/1/create_topic/
{
  "title": "Frontend",
  "description": "Обсуждаем React и Material UI"
}
```
# 📄 requirements.txt
Django==5.0.6
djangorestframework==3.15.1
djangorestframework-simplejwt==5.3.1
django-cors-headers==4.3.1
django-rest-authtoken==1.2.0
pytz==2024.1
sqlparse==0.5.0

## 📌 Пояснения
Django — основной фреймворк.

djangorestframework — REST API.

djangorestframework-simplejwt — если захочешь JWT вместо токенов.

django-cors-headers — чтобы фронтенд на localhost:3000 мог обращаться к API.

django-rest-authtoken — токен‑авторизация (ты её используешь).

pytz и sqlparse — стандартные зависимости Django.
