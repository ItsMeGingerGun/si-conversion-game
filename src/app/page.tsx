import Link from 'next/link';
import { headers } from 'next/headers';

export default function Home() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isFrameRequest = userAgent.includes('farcaster') || userAgent.includes('farcaster-client');

  if (isFrameRequest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">SI Unit Challenge</h1>
        <p className="text-xl mb-8">Click the buttons below to play!</p>
        <div className="flex space-x-4">
          <Link href="/game/easy" className="bg-blue-500 text-white px-6 py-3 rounded-lg">
            Easy
          </Link>
          <Link href="/game/medium" className="bg-green-500 text-white px-6 py-3 rounded-lg">
            Medium
          </Link>
          <Link href="/game/hard" className="bg-red-500 text-white px-6 py-3 rounded-lg">
            Hard
          </Link>
        </div>
      </div>
    );
  }

  // Original landing page content
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">SI Unit Conversion Challenge</h1>
      <div className="flex flex-col space-y-4">
        <Link href="/game/easy" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
          Easy (20 seconds)
        </Link>
        <Link href="/game/medium" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center">
          Medium (15 seconds)
        </Link>
        <Link href="/game/hard" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center">
          Hard (10 seconds)
        </Link>
      </div>
    </div>
  );
}
