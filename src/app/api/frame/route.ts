import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const frameUrl = `${process.env.NEXT_PUBLIC_APP_URL}/frame.png`;
  
  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="${frameUrl}">
        <meta property="og:image" content="${frameUrl}">
        <meta property="fc:frame:button:1" content="Easy (20s)">
        <meta property="fc:frame:button:1:action" content="post_redirect">
        <meta property="fc:frame:button:2" content="Medium (15s)">
        <meta property="fc:frame:button:2:action" content="post_redirect">
        <meta property="fc:frame:button:3" content="Hard (10s)">
        <meta property="fc:frame:button:3:action" content="post_redirect">
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_APP_URL}/api/frame">
      </head>
      <body>
        <h1>SI Unit Challenge</h1>
        <p>Test your conversion skills!</p>
      </body>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
