'use client';
import { useEffect } from 'react';
import { actions } from '@farcaster/frame-sdk'; 

export default function FarcasterReady() {
  useEffect(() => {
    actions.ready().then(() => {
      console.log('Farcaster SDK ready');
    }).catch(console.error);
  }, []);
  
  return null;
}
