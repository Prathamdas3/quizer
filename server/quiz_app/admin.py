from django.contrib import admin
from .models import Question,QuizSession,UserAnswer

# Register your models here.
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['question_text', 'correct_option']

@admin.register(QuizSession)
class QuizSessionAdmin(admin.ModelAdmin):
    list_display = ['total_questions_answered', 'correct_answers', 'incorrect_answers']


@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ['session', 'question', 'selected_option', 'is_correct']