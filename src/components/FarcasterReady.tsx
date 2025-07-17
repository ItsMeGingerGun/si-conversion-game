'use client';
import { useEffect } from 'react';
import Frame from '@farcaster/frame-sdk';

export default function FarcasterReady() {
  useEffect(() => {
    Frame.ready().then(() => {
      console.log('Farcaster SDK ready');
    }).catch(console.error);
  }, []);
  
  return null;
}
