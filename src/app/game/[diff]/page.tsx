'use client';

import { useState, useEffect } from 'react';
import Timer from '@/components/Timer';
import Leaderboard from '@/components/Leaderboard';
import { generateQuestion, timeLimits } from '@/lib/gameLogic';
import { useRouter } from 'next/navigation';


export default function GamePage({ params }: { params: { diff: string } }) {
  const difficulty = params.diff as keyof typeof timeLimits;
  const [question, setQuestion] = useState<any>(null);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const router = useRouter();

  useEffect(() => {
    newQuestion();
  }, []);

  const newQuestion = () => {
    setQuestion(generateQuestion());
    setAnswer('');
  };

  const checkAnswer = () => {
    if (parseFloat(answer) === question?.answer) {
      setScore(prev => prev + 1);
      newQuestion();
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameOver(true);
    // Submit score to leaderboard API
    fetch('/api/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ difficulty, score })
    });
  };

  if (gameOver) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Game Over!</h1>
      <p className="text-2xl mb-8">Your Score: {score}</p>
      <button 
        onClick={() => router.push('/')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Play Again
      </button>
      <Leaderboard difficulty={difficulty} />
    </div>
  );

  return question && (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">{question.question}</h1>
      <div className="flex items-center mb-6">
        <input 
          type="number" 
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded mr-2 text-center w-32 text-xl"
          placeholder="Answer"
        />
        <button 
          onClick={checkAnswer}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
      <Timer duration={timeLimits[difficulty]} onEnd={endGame} />
      <p className="mt-4 text-xl">Score: {score}</p>
    </div>
  );
}
