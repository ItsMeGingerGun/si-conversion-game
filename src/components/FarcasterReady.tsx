'use client';
import { useEffect } from 'react';
import * as frame from '@farcaster/frame-sdk';

export default function FarcasterReady() {
  useEffect(() => {
    frame.sdk.actions.ready().then(() => {
      console.log('Farcaster SDK ready');
    }).catch(console.error);
  }, []);
  
  return null;
}
