'use client';

import { useEffect, useState } from 'react';

export default function Leaderboard({ difficulty }: { difficulty: string }) {
  const [scores, setScores] = useState<[string, number][]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const res = await fetch(`/api/leaderboard?difficulty=${difficulty}`);
      const data = await res.json();
      setScores(data);
    };
    fetchScores();
  }, [difficulty]);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold">Top Scores:</h3>
      <ul>
        {scores.map(([player, score], index) => (
          <li key={index} className="flex justify-between">
            <span>{player}</span>
            <span>{score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
