import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_APP_URL}/frame.png">
        <meta property="og:image" content="${process.env.NEXT_PUBLIC_APP_URL}/frame.png">
        <meta property="fc:frame:button:1" content="Play Easy">
        <meta property="fc:frame:button:1:action" content="post_redirect">
        <meta property="fc:frame:button:2" content="Play Medium">
        <meta property="fc:frame:button:2:action" content="post_redirect">
        <meta property="fc:frame:button:3" content="Play Hard">
        <meta property="fc:frame:button:3:action" content="post_redirect">
      </head>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const buttonIndex = body.untrustedData.buttonIndex;
  
  let redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/game/easy`;
  if (buttonIndex === 2) redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/game/medium`;
  if (buttonIndex === 3) redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/game/hard`;

  return NextResponse.redirect(redirectUrl, 302);
}
