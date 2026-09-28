//src/components/QuizButtons.jsx
import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import ReactMarkdown from 'react-markdown';

export function formatQuizButton(quiz){
    return <div>
    {quiz.date}
    <br />
    <br />
    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{quiz.title}</div> 
    <br />
        <div style={{ fontSize: "1rem"}}>
    <ReactMarkdown >
        {quiz.comment}
    </ReactMarkdown>
    </div> 
    </div>
}

export function QuizButtons(quizzes,path){
   const navigate = useNavigate();
    return (quizzes.map((quiz) => (
          <li key={quiz.id}>
            <button onClick={() => navigate(`${path}${quiz.id}`)}>
              {formatQuizButton(quiz)}
            </button>
          </li>
        )));
}
