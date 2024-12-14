from django.urls import path
from .views import start_quiz,create_quiz,submit_answers,history

urlpatterns = [
path('start/',start_quiz.as_view(),name='start_quiz'),
path('questions/',create_quiz.as_view(),name="create_quiz"),
path('submit_answers/',submit_answers.as_view(),name="submit_answer"),
path('history/',history.as_view(),name='quiz_historyI')
]
