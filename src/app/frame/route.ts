import { NextRequest, NextResponse } from 'next/server';

// Helper function to generate frame HTML
const generateFrameHtml = (imageUrl: string, buttons: string[], postUrl: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="${imageUrl}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="fc:frame:post_url" content="${postUrl}">
  ${buttons.map((text, i) => `
    <meta property="fc:frame:button:${i + 1}" content="${text}">
    <meta property="fc:frame:button:${i + 1}:action" content="post_redirect">
  `).join('')}
</head>
<body>
  <h1>SI Unit Challenge</h1>
  <p>Test your conversion skills!</p>
</body>
</html>
`;

export async function GET(req: NextRequest) {
  const frameUrl = `${process.env.NEXT_PUBLIC_APP_URL}/frame.png`;
  const postUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`;
  
  // Create frame with difficulty options
  const frameHtml = generateFrameHtml(
    frameUrl,
    ["Easy (20s)", "Medium (15s)", "Hard (10s)"],
    postUrl
  );

  return new NextResponse(frameHtml, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    // Parse frame message
    const body = await req.json();
    const buttonIndex = body.untrustedData?.buttonIndex;
    
    // Handle button actions
    let redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/game/easy`;
    if (buttonIndex === 2) redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/game/medium`;
    if (buttonIndex === 3) redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/game/hard`;

    return NextResponse.redirect(redirectUrl, 302);
  } catch (error) {
    console.error('Frame POST error:', error);
    return new NextResponse('Error processing frame action', {
      status: 500,
    });
  }
}
