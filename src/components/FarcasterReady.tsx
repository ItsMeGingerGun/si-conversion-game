'use client';

import { useEffect } from 'react';
import { actions } from '@farcaster/mini-apps-sdk';

export default function FarcasterReady() {
  useEffect(() => {
    // Notify Farcaster that the app is ready
    actions.ready().then(() => {
      console.log('Farcaster SDK ready');
    }).catch(error => {
      console.error('Farcaster ready error:', error);
    });
  }, []);

  return null; // This component doesn't render anything
}
