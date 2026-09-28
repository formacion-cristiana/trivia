// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./components/Landing";
import QuizLoader from "./components/QuizLoader";
import PrintableHome from "./components/PrintableHome";
import PrintableQuizPage from "./components/PrintableQuizPage";
import PrintableAllQuizzesPage from "./components/PrintableAllQuizzesPage";
import { SITE_TITLE,GIT_URL } from "../config/siteConfig.js";

// App component accepts props for SSR prerender
export default function App({
  initialQuizId = null,
  preloadedQuizzes = [],
}) {
  return (
    <>
      <div
        className="App"
        style={{ marginBottom: "3rem" }}
      >
      <a href={GIT_URL}>
          <img
            src={import.meta.env.BASE_URL + "logo-titulo.png"}
            alt=""
            style={{
              maxWidth: "100%",
              height: "auto",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
          />
        </a>

        <a href={import.meta.env.BASE_URL} style={{textDecoration: "none",}}><h1   className="blueBotton"> {SITE_TITLE.toUpperCase()} </h1>
     </a>

        <Routes>
          <Route path="/" element={<Landing />} />

          <Route
            path="/quizzes/:quizId"
            element={
              <QuizLoader
                preloadedQuiz={
                  initialQuizId
                    ? preloadedQuizzes.find(
                        (q) => q.id === initialQuizId
                      )
                    : null
                }
              />
            }
          />

          <Route
            path="/printable"
            element={<PrintableHome />}
          />

          <Route
            path="/printable/quizzes/:quizId"
            element={<PrintableQuizPage />}
          />

          <Route
            path="/print-all"
            element={<PrintableAllQuizzesPage />}
          />
        </Routes>
      </div>
    </>
  );
}