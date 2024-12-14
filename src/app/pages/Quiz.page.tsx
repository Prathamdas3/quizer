import Loader from '@/components/Loader';
import { useGetQuizQuestions, useSubmitAnswers, answer } from '@/hooks/api.hook';
import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router'

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<answer[]>([])
  const router = useNavigate()
  const { data, isLoading, error } = useGetQuizQuestions()
  const { mutate, data: summary } = useSubmitAnswers()
  const session_id = localStorage.getItem("session_key")
  const value: { id: number, answers: answer[] } = useMemo(() => ({ id: 0, answers: [] }), [])
  useEffect(() => {
    if (session_id !== null) {
      value.id = JSON.parse(session_id)
    } else {
      router('/')
    }
  }, [router, session_id, value])

  


  useEffect(() => {
    const handleBeforeUnload = () => {
      router('/summary')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [router])

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div className='flex flex-col min-h-[calc(100vh-80px)] justify-center items-center'>
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <Link to="/" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
        Go back to Home
      </Link>
    </div>
  }

  const currentQuestion = data && data[currentQuestionIndex]

  const handleAnswer = (option: string) => {
    const newAnswer: answer = {
      question: currentQuestion.id,
      selected_option: option.toUpperCase()
    }

    setUserAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(a => a.question === currentQuestion.id)
      if (existingAnswerIndex !== -1) {
        const newAnswers = [...prevAnswers]
        newAnswers[existingAnswerIndex] = newAnswer
        return newAnswers
      } else {
        return [...prevAnswers, newAnswer]
      }
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      value.answers = userAnswers
      mutate({ session: value.id, answers: value.answers })
    }
  }

  const isAnswered = userAnswers.some(a => a.question === currentQuestion.id)

  return (
    <div className="container px-4 py-8 mx-auto min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
      {summary ?
        <div className="max-w-2xl p-8 mx-auto text-center bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1 className="mb-6 text-3xl font-bold">Quiz Summary</h1>
          <p className='m-4 text-xl'>Total questions: {summary.total_questions}</p>
          <p className='m-4 text-xl'>Total Correct Answers: {summary.total_correct}</p>
          <p className='m-4 text-xl'>Your Score: {summary.total_correct}/{summary.total_questions}</p>
          <div className="mt-8">
            <Link to="/" className="px-4 py-2 mr-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
              Home
            </Link>
            <Link to="/history" className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
              View History
            </Link>
          </div>
        </div>
        : <div className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex justify-between">
            <h1 className="mb-6 text-3xl font-bold">Question {currentQuestionIndex + 1}</h1>
            <div className="flex items-center justify-center h-6 px-2 text-sm font-semibold text-white bg-blue-500 rounded-xl">
              {data.length - currentQuestionIndex} / {data.length}
            </div>
          </div>

          <p className="mb-6 text-xl">{currentQuestion.question_text}</p>
          <div className="space-y-4">
            {['a', 'b', 'c', 'd'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${userAnswers.find(a => a.question === currentQuestion.id)?.selected_option === option.toUpperCase()
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                {currentQuestion[`option_${option}` as keyof typeof currentQuestion]}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="w-full px-4 py-2 mt-8 font-bold text-white bg-green-500 rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex === data.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>}
    </div>
  )
}

