import { NextRequest, NextResponse } from 'next/server';

// Helper function to generate frame HTML
const generateFrameHtml = (
  imageUrl: string,
  buttons: string[],
  postUrl: string,
  state?: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="${imageUrl}">
  <meta property="fc:frame:image:aspect_ratio" content="1.91:1">
  <meta property="og:image" content="${imageUrl}">
  <meta property="fc:frame:post_url" content="${postUrl}">
  ${state ? `<meta property="fc:frame:state" content="${state}">` : ''}
  ${buttons.map((text, i) => `
    <meta property="fc:frame:button:${i + 1}" content="${text}">
    <meta property="fc:frame:button:${i + 1}:action" content="post_redirect">
  `).join('')}
  
  <!-- Add these Open Graph tags for better compatibility -->
  <meta property="og:title" content="SI Unit Challenge">
  <meta property="og:description" content="Test your metric conversion skills against the clock!">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${process.env.NEXT_PUBLIC_APP_URL}">
  
  <title>SI Unit Challenge</title>
</head>
<body>
  <h1>SI Unit Challenge</h1>
  <p>Test your conversion skills!</p>
</body>
</html>
`;

export async function GET(req: NextRequest) {
  try {
    const frameUrl = `${process.env.NEXT_PUBLIC_APP_URL}/frame.png`;
    const postUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`;
    
    // Generate a unique state ID for tracking
    const stateId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    
    return new NextResponse(
      generateFrameHtml(
        frameUrl,
        ["Easy (20s)", "Medium (15s)", "Hard (10s)"],
        postUrl,
        stateId
      ),
      {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store, max-age=0',
          // Add frame validator headers
          'Access-Control-Allow-Origin': '*',
          'Farcaster-Frame-Version': 'vNext'
        },
      }
    );
  } catch (error) {
    console.error('Frame GET error:', error);
    return new NextResponse('Error generating frame', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('Invalid content type');
    }
    
    const body = await req.json();
    if (!body.untrustedData || typeof body.untrustedData.buttonIndex !== 'number') {
      throw new Error('Invalid frame data');
    }
    
    const buttonIndex = body.untrustedData.buttonIndex;
    const state = body.untrustedData.state || '';
    
    console.log(`Frame action received - Button: ${buttonIndex}, State: ${state}`);
    
    // Handle button actions
    let difficulty = 'easy';
    if (buttonIndex === 2) difficulty = 'medium';
    if (buttonIndex === 3) difficulty = 'hard';
    
    // Use URL constructor for safer URL handling
    const redirectUrl = new URL(
      `/game/${difficulty}`,
      process.env.NEXT_PUBLIC_APP_URL
    );
    redirectUrl.searchParams.set('state', state);
    
    return NextResponse.redirect(redirectUrl.toString(), 302);
  } catch (error) {
    console.error('Frame POST error:', error);
    return new NextResponse('Error processing frame action', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      },
    });
  }
}
