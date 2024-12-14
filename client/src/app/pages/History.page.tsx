import { Link } from 'react-router'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle, XCircle } from 'lucide-react'
import { useGetHistory } from '@/hooks/api.hook'
import Loader from '@/components/Loader';
import { useEffect, useState } from 'react';

interface Question {
  question_text: string;
  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;
}

interface HistoryItem {
  id: number;
  session: number;
  question: Question;
  selected_option: string;
  is_correct: boolean;
  correct_option: string
}

interface SessionDetail {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface FormattedSession {
  date: string;
  score: number;
  totalQuestions: number;
  details: SessionDetail[];
}



const formatHistoryData = (data: HistoryItem[][]): FormattedSession[] => {
  return data.map((sessionData: HistoryItem[]) => {
    const score = sessionData.filter((item) => item.is_correct).length;
    const totalQuestions = sessionData.length;
    const details: SessionDetail[] = sessionData.map((item) => ({
      question: item.question?.question_text || 'No question text available',
      userAnswer: item.selected_option,
      correctAnswer: item.correct_option || 'Unknown',
      isCorrect: item.is_correct,
    }));
    return {
      date: new Date().toISOString(),
      score,
      totalQuestions,
      details
    };
  });
};




export default function HistoryPage() {
  const { data, isLoading } = useGetHistory()
  const [history, setHistory] = useState<FormattedSession[]>([])

  useEffect(() => {
    if (data) {
      const historyData = formatHistoryData(data)
      setHistory(historyData)
    }
  }, [data])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="container px-4 py-8 mx-auto min-h-[calc(100vh-80px)]">
      <h1 className="mb-6 text-3xl font-bold">Quiz History</h1>
      {history?.length === 0 ? (
        <p>No quiz history available.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {history?.map((result, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left">
                <div>
                  <span className="font-semibold">
                    {new Date(result.date).toLocaleString()}
                  </span>
                  <span className="ml-4">
                    Score: {result.score}/{result.totalQuestions}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {result.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="pb-2 border-b">
                      <p className="font-medium">{detail.question}</p>
                      <p className="flex items-center">
                        Your answer: {detail.userAnswer}
                        {detail.isCorrect ? (
                          <CheckCircle className="ml-2 text-green-500" size={16} />
                        ) : (
                          <XCircle className="ml-2 text-red-500" size={16} />
                        )}
                      </p>
                      {!detail.isCorrect && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Correct answer: {detail.correctAnswer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      <div className="flex justify-center mt-8">
        <Link to="/" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

