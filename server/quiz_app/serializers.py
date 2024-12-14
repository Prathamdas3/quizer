from rest_framework import serializers
from .models import Question, QuizSession, UserAnswer


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d']


class QuizSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizSession
        fields = ['id', 'total_questions_answered', 'correct_answers', 'incorrect_answers']


class UserAnswerSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(read_only=True)  

    class Meta:
        model = UserAnswer
        fields = ['id', 'session', 'question', 'selected_option', 'is_correct','correct_option']
