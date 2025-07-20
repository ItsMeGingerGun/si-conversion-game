import Link from 'next/link';
import { headers } from 'next/headers'; 

export default function Home() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const secFetchDest = headersList.get('sec-fetch-dest') || '';
  
  // Enhanced frame detection
  const isFrameRequest = 
    /farcaster|farcaster-client|farcaster-bot|farcaster-embed/i.test(userAgent) ||
    secFetchDest === 'iframe';

  if (isFrameRequest) {
    const frameUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`;
    const imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/frame.png`;
    
    return (
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content={imageUrl} />
          <meta property="og:image" content={imageUrl} />
          <meta property="fc:frame:button:1" content="Easy (20s)" />
          <meta property="fc:frame:button:1:action" content="post_redirect" />
          <meta property="fc:frame:button:2" content="Medium (15s)" />
          <meta property="fc:frame:button:2:action" content="post_redirect" />
          <meta property="fc:frame:button:3" content="Hard (10s)" />
          <meta property="fc:frame:button:3:action" content="post_redirect" />
          <meta property="fc:frame:post_url" content={frameUrl} />
          <title>SI Unit Challenge</title>
          <meta property="og:title" content="SI Unit Challenge" />
          <meta property="og:description" content="Test your metric conversion skills against the clock!" />
        </head>
        <body>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
            <h1 className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              SI Unit Challenge
            </h1>
            <p className="text-xl mb-8 text-center text-gray-800">Test your conversion skills!</p>
          </div>
        </body>
      </html>
    );
  }

  // Standard landing page for browsers
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          SI Unit Conversion Challenge
        </h1>
        
        <div className="mb-10 mx-auto max-w-2xl">
          <p className="text-xl text-gray-800">
            Test your knowledge of metric system conversions in this fast-paced game!
            Convert between grams, kilograms, meters, seconds and more against the clock.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-14">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl shadow-xl border-4 border-blue-300 transform transition duration-500 hover:scale-105">
            <div className="mb-5">
              <div className="bg-blue-500 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto text-2xl shadow-lg">
                20s
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-blue-800">Easy Mode</h2>
            <p className="mb-4 text-blue-700">Perfect for beginners</p>
            <Link 
              href="/game/easy" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-block transition duration-300 shadow-lg hover:shadow-xl"
            >
              Play Easy
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl shadow-xl border-4 border-green-300 transform transition duration-500 hover:scale-105">
            <div className="mb-5">
              <div className="bg-green-500 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto text-2xl shadow-lg">
                15s
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-green-800">Medium Mode</h2>
            <p className="mb-4 text-green-700">For experienced players</p>
            <Link 
              href="/game/medium" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg inline-block transition duration-300 shadow-lg hover:shadow-xl"
            >
              Play Medium
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-2xl shadow-xl border-4 border-red-300 transform transition duration-500 hover:scale-105">
            <div className="mb-5">
              <div className="bg-red-500 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto text-2xl shadow-lg">
                10s
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-red-800">Hard Mode</h2>
            <p className="mb-4 text-red-700">Expert level challenge</p>
            <Link 
              href="/game/hard" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg inline-block transition duration-300 shadow-lg hover:shadow-xl"
            >
              Play Hard
            </Link>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border-4 border-purple-200 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">How to Play</h2>
          <ul className="text-left grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <li className="flex items-start bg-white/50 p-4 rounded-xl">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-1 font-bold">1</span>
              <span className="text-gray-800 font-medium">Choose a difficulty level</span>
            </li>
            <li className="flex items-start bg-white/50 p-4 rounded-xl">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-1 font-bold">2</span>
              <span className="text-gray-800 font-medium">Convert units before time runs out</span>
            </li>
            <li className="flex items-start bg-white/50 p-4 rounded-xl">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-1 font-bold">3</span>
              <span className="text-gray-800 font-medium">Submit your answer</span>
            </li>
            <li className="flex items-start bg-white/50 p-4 rounded-xl">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-1 font-bold">4</span>
              <span className="text-gray-800 font-medium">Climb the global leaderboard</span>
            </li>
          </ul>
        </div>
        
        {/* Social Engagement Section */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border-4 border-amber-200">
          <h2 className="text-3xl font-bold mb-6 text-amber-800">Challenge Your Friends!</h2>
          <p className="text-gray-800 mb-6 text-lg">
            Share your scores and challenge others on Farcaster. The more you share, 
            the higher you climb on our special engagement leaderboard!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <div className="bg-white/80 p-4 rounded-xl border-2 border-purple-300 shadow-md">
              <h3 className="font-bold text-purple-700 mb-2">Share Frame</h3>
              <p className="text-gray-700 mb-3">Copy this link to share:</p>
              <div className="bg-gray-100 p-2 rounded-lg text-sm font-mono break-all">
                {process.env.NEXT_PUBLIC_APP_URL || 'https://your-app-url.com'}
              </div>
            </div>
            
            <div className="bg-white/80 p-4 rounded-xl border-2 border-blue-300 shadow-md">
              <h3 className="font-bold text-blue-700 mb-2">Get Sharing Bonus</h3>
              <p className="text-gray-700 mb-3">Share your score to earn +5 points!</p>
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold">
                  +5 Points
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-4 rounded-xl max-w-md mx-auto shadow-lg">
            <h3 className="font-bold text-white text-xl mb-2">Top Sharers This Week</h3>
            <div className="flex justify-around text-white text-sm">
              <div>1. @MetricMaster - 42 shares</div>
              <div>2. @UnitConverter - 28 shares</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
