'use client';
import { useState, useEffect } from 'react';
import * as frame from '@farcaster/frame-sdk';

export default function FarcasterFallback({ children }: { children: React.ReactNode }) {
  const [sdkReady, setSdkReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    frame.sdk.actions.ready()
      .then(() => setSdkReady(true))
      .catch(e => setError(e.message || 'SDK initialization failed'));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">App Failed to Load</h1>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reload App
          </button>
        </div>
      </div>
    );
  }

  return sdkReady ? <>{children}</> : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
