'use client'; // Add this at the very top

import { useState, useEffect } from 'react';
import Timer from '../../../components/Timer';
import { generateQuestion, timeLimits } from '../../../lib/gameLogic';
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
    if (parseFloat(answer) === question.answer) {
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
      body: JSON.stringify({ difficulty, score })
    });
  };

  if (gameOver) return (
    <div>
      <h1>Game Over! Score: {score}</h1>
      <button onClick={() => router.push('/')}>Home</button>
    </div>
  );

  return question && (
    <div>
      <h1>{question.question}</h1>
      <input 
        type="number" 
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)} 
      />
      <button onClick={checkAnswer}>Submit</button>
      <Timer 
        duration={timeLimits[difficulty]} 
        onEnd={endGame} 
      />
      <p>Score: {score}</p>
    </div>
  );
}
