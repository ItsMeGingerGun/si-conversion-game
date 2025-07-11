'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LeaderboardPage() {
  const [leaderboards, setLeaderboards] = useState<Record<string, [string, number][]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const difficulties = ['easy', 'medium', 'hard'];
        const data: Record<string, [string, number][]> = {};
        
        for (const diff of difficulties) {
          const res = await fetch(`/api/leaderboard?difficulty=${diff}`);
          const scores = await res.json();
          data[diff] = scores;
        }
        
        setLeaderboards(data);
      } catch (error) {
        console.error('Error fetching leaderboards:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboards();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Leaderboards</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['easy', 'medium', 'hard'].map((difficulty) => (
            <div key={difficulty} className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 capitalize">
                {difficulty} Mode
              </h2>
              
              <div className="space-y-3">
                {leaderboards[difficulty]?.map(([player, score], index) => (
                  <div key={index} className="flex justify-between border-b pb-2">
                    <span className="font-medium">#{index + 1} {player}</span>
                    <span className="text-blue-600 font-bold">{score}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition"
          >
            Play Game
          </Link>
        </div>
      </div>
    </div>
  );
}
