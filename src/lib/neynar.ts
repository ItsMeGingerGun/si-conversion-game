import { NeynarAPIClient } from '@neynar/nodejs-sdk';

export const neynarClient = new NeynarAPIClient(
  process.env.NEYNAR_API_KEY!
);

export async function validateFrameMessage(messageBytes: string) {
  try {
    const result = await neynarClient.validateFrameAction(messageBytes);
    return result.valid ? result.action : null;
  } catch (error) {
    console.error('Frame validation error:', error);
    return null;
  }
}
