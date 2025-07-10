import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';
import { neynarClient } from '@/lib/neynar';

export async function POST(req: Request) {
  const { difficulty, score, fid } = await req.json();
  
  // Get username from FID
  let username = `user_${fid}`;
  try {
    const user = await neynarClient.lookupUserByFid(fid);
    username = user.username || username;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
  
  await redis.zadd(`leaderboard:${difficulty}`, {
    score,
    member: `${username}:${fid}`
  });

  return NextResponse.json({ success: true });
}

export async function POST(req: Request) {
  const { difficulty, score } = await req.json();
  
  await redis.zadd(`leaderboard:${difficulty}`, {
    score,
    member: Date.now().toString() // Use FID in production
  });

  return NextResponse.json({ success: true });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const difficulty = searchParams.get('difficulty')!;
  
  const data = await redis.zrange(
    `leaderboard:${difficulty}`, 
    0, 
    9, 
    { withScores: true, rev: true }
  );

  return NextResponse.json(data);
}
