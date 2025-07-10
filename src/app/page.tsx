import Link from 'next/link';
import { headers } from 'next/headers';

export default function Home() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isFrameRequest = userAgent.includes('farcaster') || userAgent.includes('farcaster-client');

  if (isFrameRequest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">SI Unit Challenge</h1>
        <p className="text-xl mb-8 text-center">Test your conversion skills! Click a difficulty to start playing:</p>
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
          <Link 
            href="/game/easy" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-200"
          >
            Easy (20s)
          </Link>
          <Link 
            href="/game/medium" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-200"
          >
            Medium (15s)
          </Link>
          <Link 
            href="/game/hard" 
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-200"
          >
            Hard (10s)
          </Link>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">Share this frame to challenge friends!</p>
          <div className="flex justify-center space-x-2">
            <span className="bg-gray-200 px-2 py-1 rounded">Easy</span>
            <span className="bg-gray-200 px-2 py-1 rounded">Medium</span>
            <span className="bg-gray-200 px-2 py-1 rounded">Hard</span>
          </div>
        </div>
      </div>
    );
  }

  // Standard landing page for browsers
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold mb-6 text-indigo-800">SI Unit Conversion Challenge</h1>
        <p className="text-xl mb-10 text-gray-700 max-w-lg mx-auto">
          Test your knowledge of metric system conversions in this fast-paced game!
          Convert between grams, kilograms, meters, seconds and more against the clock.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold mb-3 text-blue-600">Easy</h2>
            <p className="mb-4 text-gray-600">20 seconds per question</p>
            <Link 
              href="/game/easy" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg inline-block transition duration-200"
            >
              Play Easy
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
            <h2 className="text-2xl font-bold mb-3 text-green-600">Medium</h2>
            <p className="mb-4 text-gray-600">15 seconds per question</p>
            <Link 
              href="/game/medium" 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg inline-block transition duration-200"
            >
              Play Medium
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-red-100">
            <h2 className="text-2xl font-bold mb-3 text-red-600">Hard</h2>
            <p className="mb-4 text-gray-600">10 seconds per question</p>
            <Link 
              href="/game/hard" 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg inline-block transition duration-200"
            >
              Play Hard
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">How to Play</h2>
          <ul className="text-left grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <li className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 rounded-full h-6 w-6 flex items-center justify-center mr-2 mt-1">1</span>
              <span>Choose a difficulty level</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 rounded-full h-6 w-6 flex items-center justify-center mr-2 mt-1">2</span>
              <span>Convert between units before time runs out</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 rounded-full h-6 w-6 flex items-center justify-center mr-2 mt-1">3</span>
              <span>Submit your answer</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 rounded-full h-6 w-6 flex items-center justify-center mr-2 mt-1">4</span>
              <span>Compete on the global leaderboard</span>
            </li>
          </ul>
          <p className="text-gray-600">
            Try to beat your high score! Share your results on Farcaster to challenge friends.
          </p>
        </div>
      </div>
    </div>
  );
}
