'use client';

import { useEffect, useState } from 'react';

export default function Timer({ 
  duration, 
  onEnd 
}: { 
  duration: number; 
  onEnd: () => void 
}) {
  const [timeLeft, setTimeLeft] = useState(duration / 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          clearInterval(timer);
          onEnd();
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onEnd]);

  return <div>Time: {timeLeft.toFixed(1)}s</div>;
}
