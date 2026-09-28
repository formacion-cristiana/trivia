// src/components/PrintableHome.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { quizSets } from "../../config/quizSets";
import { QuizButtons } from "./QuizButtons";

function PrintableHome() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const loadTitles = async () => {
      // Obtener todos los IDs definidos en quizSets.js
      const allIds = quizSets.flatMap((set) => set.quizzes);

      const loaded = await Promise.all(
        allIds.map(async (id) => {
          try {
            const res = await fetch(
              `${import.meta.env.BASE_URL}quizzes/${id}.json`
            );

            if (!res.ok) {
              throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();

            console.log("Loaded quiz:", data.title);

            return {
              id: data.id,
              title: data.title,
              date: data.date,
              comment: data.comment,
            };
          } catch (err) {
            console.error(`Error loading quiz "${id}":`, err);
            return null;
          }
        })
      );

      setQuizzes(loaded.filter((q) => q !== null));
    };

    loadTitles();
  }, []);

  return (
    <div>
      <h2>Imprimibles</h2>

      <ul style={{ paddingLeft: "0rem" }}>
        {/* Imprimir todos */}
        <li>
          <Link to="/print-all">
            📄 Imprimir todos los quizzes
          </Link>
        </li>

        {/* Quizzes agrupados por set */}
        {quizSets.map((set) => {
          const setQuizzes = quizzes.filter((quiz) =>
            set.quizzes.includes(quiz.id)
          );

          return (
            <details
              key={set.id}
              style={{ marginTop: "1rem" }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  padding: "0.7rem",
                }}
              >
                {set.title}
              </summary>

              <ul style={{ paddingLeft: "0rem" }}>
                {QuizButtons(
                  setQuizzes,
                  "/printable/quizzes/"
                )}
              </ul>
            </details>
          );
        })}
      </ul>
    </div>
  );
}

export default PrintableHome;