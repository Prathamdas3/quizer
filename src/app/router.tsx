import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/providers/theme.provider";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
const QuizPage = lazy(() => import("./pages/Quiz.page"));
const HomePage = lazy(() => import("./pages/Home.page"));
const NotFoundPage = lazy(() => import("./pages/NotFound.page"))
const HistoryPage = lazy(() => import("./pages/History.page"))


export default function Router() {
  const queryClient = new QueryClient()
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <div className="text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
            <Navbar />
            <main>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </ThemeProvider>
      </QueryClientProvider >
    </BrowserRouter>
  );
}