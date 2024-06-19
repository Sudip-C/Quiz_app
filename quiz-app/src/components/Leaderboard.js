// src/components/Leaderboard.js
import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

const Leaderboard = () => {
  const { leaderboard } = useContext(QuizContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <table className="table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard
            .sort((a, b) => b.score - a.score)
            .map((entry, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{entry.name}</td>
                <td className="border px-4 py-2">{entry.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
