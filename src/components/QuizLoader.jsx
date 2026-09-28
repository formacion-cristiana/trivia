// src/components/QuizLoader.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Quiz from "./Quiz";
import ReactMarkdown from "react-markdown";

const isServer = typeof window === "undefined";

/**
 * Utility to load quiz data from file (server) or fetch (client)
 */
async function loadQuizData(quizId) {
  if (isServer) {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      process.cwd(),
      "public",
      "quizzes",
      `${quizId}.json`
    );
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } else {
    const res = await fetch(`${import.meta.env.BASE_URL}quizzes/${quizId}.json`);
    return res.json();
  }
}

function QuizLoader({ preloadedQuiz = null }) {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(preloadedQuiz || null);
  const [loading, setLoading] = useState(!preloadedQuiz && !isServer);

  useEffect(() => {
    // If we already have preloadedQuiz or on server, no need to fetch
    if (preloadedQuiz || !quizId) return;

    (async () => {
      try {
        const data = await loadQuizData(quizId);
        setQuizData(data);
      } catch (err) {
        console.error("Error loading quiz:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [quizId, preloadedQuiz]);

  if (loading) return <div>Loading...</div>;
  if (!quizData) return <div>Quiz not found</div>;

  return (
        <div className="landing">
      <div className="App">
        <h2>
          <ReactMarkdown>{quizData.title}</ReactMarkdown>
        </h2>
        <h3 style={{ marginBottom: "4rem" }}>
          <ReactMarkdown>{quizData.comment}</ReactMarkdown>
        </h3>
        <Quiz quiz={quizData} />
      </div>
    </div>
  );
}

export default QuizLoader;
