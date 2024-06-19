// src/components/Quiz.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import { fetchWithRetry } from '../utils/fetchWithRetry';

const Quiz = () => {
  const { quizSettings, setLeaderboard } = useContext(QuizContext);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const [background,setBackground]= useState(false)

  const fetchQuestions = async () => {
    try {
      const data = await fetch(`https://opentdb.com/api.php?amount=${quizSettings.amount}&category=${quizSettings.category}&difficulty=${quizSettings.difficulty}&type=multiple`);
      const question=await data.json()
      setQuestions(question.results);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  useEffect(() => {
    

    fetchQuestions();

    switch (quizSettings.difficulty) {
      case 'hard':
        setTimer(10);
        break;
      case 'medium':
        setTimer(20);
        break;
      case 'easy':
        setTimer(30);
        break;
      default:
        setTimer(30);
    }
  }, []);

  // useEffect(() => {
  //   if (timer === 0) {
  //     nextQuestion();
  //   }
  //   const interval = setInterval(() => {
  //     setTimer((prev) => (prev > 0 ? prev - 1 : 0));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [timer]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect){ 
      setBackground(true)
      setScore(score + 1)};
    nextQuestion();
  };

  const nextQuestion = () => {
    setBackground(false)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(quizSettings.difficulty === 'hard' ? 10 : quizSettings.difficulty === 'medium' ? 20 : 30);
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setLeaderboard((prev) => [...prev, { name: quizSettings.name, score }]);
    navigate('/leaderboard');
  };

  if (!questions?.length) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Question {currentQuestionIndex + 1} of {questions.length}</h1>
      <p className="text-lg mb-4">{currentQuestion.question}</p>
      <div className="mb-4">
        {answers?.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(answer === currentQuestion.correct_answer)}
            className={background?"block bg-green-500 text-white p-2 rounded mb-2":"block bg-blue-500 text-white p-2 rounded mb-2"}
           
          >
            {answer}
          </button>
        ))}
      </div>
      <p className="text-lg mb-4">Time left: {timer} seconds</p>
      {currentQuestionIndex < questions?.length - 1 && (
        <button onClick={nextQuestion} className="bg-green-500 text-white p-2 rounded">Next</button>
      )}
      {currentQuestionIndex === questions.length - 1 && (
        <button onClick={()=>endQuiz} className="bg-red-500 text-white p-2 rounded">Submit</button>
      )}
    </div>
  );
};

export default Quiz;
