import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios'

export type answer = {
    question: number,
    selected_option: string
}

export function useGetQuizQuestions() {
    const value = useQuery({
        queryKey: ["getQuery"],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/questions/`)
                return data
            } catch (error) {
                console.log('Geting this error while quiz questions' + error)
                return null
            }
        }
    })
    return value
}

export function useStartSession() {
    const value = useMutation({
        mutationKey: ["startSession"],
        mutationFn: async () => {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/start/`)
                return data
            } catch (error) {
                console.log("Error while starting session" + error)
                return null
            }
        }
    })
    return value
}

export function useGetHistory() {
    const value = useQuery({
        queryKey: ["getQuery"],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/history/`)
                return data
            } catch (error) {
                console.log('Geting this error while getting history/' + error)
                return null
            }
        }
    })
    return value
}


export function useSubmitAnswers() {
    const value = useMutation({
        mutationKey: ["startSession"],
        mutationFn: async ({ answers, session }: { session: number, answers: answer[] }) => {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/submit_answers/`, { session, answers })
                const totalCorrect = data.submitted_answers.reduce((count:number, answer:any) => count + (answer.is_correct ? 1 : 0), 0);

                return {total_correct:totalCorrect, total_questions:data.submitted_answers.length}
            } catch (error) {
                console.log("Error while starting session" + error)
                return null
            }
        }
    })
    return value
}