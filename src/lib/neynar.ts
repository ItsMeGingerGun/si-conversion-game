import { NeynarAPIClient } from '@neynar/nodejs-sdk';

export const neynarClient = new NeynarAPIClient(
  process.env.NEYNAR_API_KEY!
);

// Temporary empty function - implement later
export async function validateFrameMessage(messageBytes: string) {
  return null;
}
