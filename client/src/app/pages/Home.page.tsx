import { useStartSession } from "@/hooks/api.hook"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function HomePage() {
  const router = useNavigate()
  const { mutate, data } = useStartSession()

  const handleStartQuiz = () => {
    router('/quiz')
    mutate()
  }

  useEffect(() => {
    if (data) {
      localStorage.setItem("session_key", data.id)
    }

  }, [data])


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <section className="flex flex-col items-center w-full max-w-2xl p-8 text-center">
        <h1 className="mb-8 text-4xl font-bold">Welcome to the Quiz App</h1>
        <div className="flex gap-4">
          <button onClick={handleStartQuiz} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
            Start Quiz
          </button>
          <button onClick={() => router('/history')} className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
            History
          </button>
        </div>
      </section>
    </div>
  )
}