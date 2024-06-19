// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SetupQuiz from './components/SetupQuiz';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SetupQuiz />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default App;
