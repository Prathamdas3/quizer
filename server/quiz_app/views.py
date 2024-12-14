from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Question, QuizSession, UserAnswer
from .serializers import QuizSessionSerializer, QuestionSerializer, UserAnswerSerializer


# Create your views here.
class start_quiz(APIView):
    def post(self, request) -> Response:
        quiz_session = QuizSession.objects.create()
        serializer = QuizSessionSerializer(quiz_session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class create_quiz(APIView):
    def get(self, request) -> Response:
        questions = Question.objects.order_by("?")[:10]
        if questions.exists():
            serializer = QuestionSerializer(questions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(
            {"error": "No questions available"}, status=status.HTTP_404_NOT_FOUND
        )


class submit_answers(APIView):

    def post(self, request) -> Response:
        # Extract session from request
        session_id = request.data.get("session")
        answers = request.data.get("answers")

        if not session_id or not answers or not isinstance(answers, list):
            return Response(
                {
                    "error": "Invalid input. 'session' is required and 'answers' should be a list."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate the session existence
        try:
            quiz_session = QuizSession.objects.get(id=session_id)
        except QuizSession.DoesNotExist:
            return Response(
                {"error": f"Invalid session ID {session_id}."},
                status=status.HTTP_404_NOT_FOUND,
            )

        submitted_answers = []
        total_questions_answered = 0
        correct_answers = 0
        incorrect_answers = 0

        for answer_data in answers:
            question_id = answer_data.get("question")
            selected_option = answer_data.get("selected_option")

            # Validate question and selected option
            if not question_id or not selected_option:
                return Response(
                    {
                        "error": "Each answer must have a 'question' and 'selected_option'."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                question = Question.objects.get(id=question_id)
            except Question.DoesNotExist:
                return Response(
                    {"error": f"Invalid question ID {question_id}."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Check if the selected option matches the correct option
            is_correct = question.correct_option == selected_option.upper()

            # Save user answer
            user_answer = UserAnswer.objects.create(
                session=quiz_session,
                question=question,
                selected_option=selected_option.upper(),
                is_correct=is_correct,
                correct_option=question.correct_option
            )

            submitted_answers.append(user_answer)
            total_questions_answered += 1
            if is_correct:
                correct_answers += 1
            else:
                incorrect_answers += 1

        # Update the quiz session only once
        quiz_session.total_questions_answered += total_questions_answered
        quiz_session.correct_answers += correct_answers
        quiz_session.incorrect_answers += incorrect_answers
        quiz_session.save()

        serializer = UserAnswerSerializer(submitted_answers, many=True)
        return Response(
            {"submitted_answers": serializer.data}, status=status.HTTP_201_CREATED
        )


class history(APIView):

    def get(self, request):
        quiz_sessions = UserAnswer.objects.all()
        serializer = UserAnswerSerializer(quiz_sessions, many=True)
        
        chunk_size = 10
        serialized_data = serializer.data
        chunked_data = [
            serialized_data[i : i + chunk_size]
            for i in range(0, len(serialized_data), chunk_size)
        ]
        return Response(chunked_data, status=status.HTTP_200_OK)
