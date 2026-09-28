// src/components/Landing.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { quizSets } from "../../config/quizSets";
import { QuizButtons } from "./QuizButtons";

export default function Landing() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const loadTitles = async () => {
      const allIds = quizSets.flatMap((set) => set.quizzes);

      const loaded = await Promise.all(
        allIds.map(async (id) => {
          const res = await fetch(
            `${import.meta.env.BASE_URL}quizzes/${id}.json`
          );

          const data = await res.json();

          return {
            id: data.id,
            title: data.title,
            date: data.date,
            comment: data.comment,
          };
        })
      );

      setQuizzes(loaded);
    };

    loadTitles();
  }, []);

  return (
 <>
      <h3>REPASÁ  ·  PROFUNDIZÁ  · DESCUBRÍ</h3>
<p> α   ·  La Historia de la Salvación  ·   ω</p>
<p> 🇻🇦 ·  La Historia de la Iglesia   · 🕊️ </p>
<p> 🗣️ ·  El Cristianismo Hoy   · ❤️‍🔥 </p>
<p> 📚   ·  Lenguaje Bíblico, Simbólico & Etimológico  ·  🔤 </p>


    <div className="landing">
      {quizSets.map((set) => {
        const setQuizzes = quizzes.filter((quiz) =>
          set.quizzes.includes(quiz.id)
        );

        return (
          <details key={set.id} style={{ marginBottom: "2rem",marginTop: "2rem" }}>
<summary className="blueBotton"
  style={{
    fontSize: "1.2rem",
  }}
>
              {set.title.toUpperCase()}
            </summary>

            <ul style={{ paddingLeft: "0rem" }}>
              {QuizButtons(setQuizzes, "/quizzes/")}
            </ul>
          </details>
        );
      })}

      <div style={{ margin: "2rem", textAlign: "center" }}>
        <Link
          to="/printable"
          style={{
            textDecoration: "underline",
            fontSize: "1.1rem"
          }}
        >
          📄 IMPRIMIR
        </Link>
      </div>
    </div>
    </>
  );
}