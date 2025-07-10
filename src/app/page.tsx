import Link from 'next/link';

export default function Home() {
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
