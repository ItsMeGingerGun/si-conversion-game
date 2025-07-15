// src/app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { z } from 'zod';

const analyticsSchema = z.object({
  state: z.string(),
  action: z.enum(['game_start', 'correct_answer', 'game_over']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  question: z.string().optional(),
  score: z.number().optional(),
  final_score: z.number().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = analyticsSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Invalid data',
        details: validation.error.issues 
      }, { status: 400 });
    }

    const { state, action, difficulty, ...extraData } = validation.data;
    
    // Create a unique key for this analytics event
    const key = `analytics:${state}:${Date.now()}`;
    
    // Store the event in Redis
    await redis.hset(key, {
      state,
      action,
      difficulty,
      timestamp: Date.now(),
      ...extraData
    });
    
    // Set expiration (30 days)
    await redis.expire(key, 60 * 60 * 24 * 30);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
