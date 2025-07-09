import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

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
