import { NeynarAPIClient } from '@neynar/nodejs-sdk';

// Empty client for now
export const neynarClient = new NeynarAPIClient(
  process.env.NEYNAR_API_KEY || 'dummy_key'
);
