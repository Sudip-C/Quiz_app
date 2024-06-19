// src/components/SetupQuiz.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';

const SetupQuiz = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [amount, setAmount] = useState(10);
  const navigate = useNavigate();
  const { setQuizSettings } = useContext(QuizContext);

  const startQuiz = () => {
    setQuizSettings({ name, category, difficulty, amount });
    navigate('/quiz');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Setup Quiz</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="">Select Category</option>
        <option value="9">General Knowledge</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
      </select>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="">Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <input
        type="number"
        placeholder="Number of Questions"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button onClick={startQuiz} className="bg-blue-500 text-white p-2 rounded">Start Quiz</button>
    </div>
  );
};

export default SetupQuiz;
