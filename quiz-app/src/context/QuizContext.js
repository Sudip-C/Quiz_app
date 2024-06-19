// src/context/QuizContext.js
import React, { createContext, useState } from 'react';

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [quizSettings, setQuizSettings] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);

  return (
    <QuizContext.Provider value={{ quizSettings, setQuizSettings, leaderboard, setLeaderboard }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };
