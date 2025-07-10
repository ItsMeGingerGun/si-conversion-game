import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const buttonIndex = body.untrustedData.buttonIndex;
  
  let redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/game/easy`;
  if (buttonIndex === 2) redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/game/medium`;
  if (buttonIndex === 3) redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/game/hard`;

  return NextResponse.redirect(redirectUrl, 302);
}
