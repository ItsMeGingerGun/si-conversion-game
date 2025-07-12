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
</head>
<body>
  <h1>SI Unit Challenge</h1>
  <p>Test your conversion skills!</p>
  <script type="text/javascript">
    console.log("Frame loaded for SI Unit Challenge");
  </script>
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
    
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/game/${difficulty}?state=${state}`;
    
    return NextResponse.redirect(redirectUrl, 302);
  } catch (error) {
    console.error('Frame POST error:', error);
    return new NextResponse('Error processing frame action', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
