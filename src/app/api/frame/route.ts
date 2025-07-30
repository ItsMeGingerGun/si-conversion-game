import { NextRequest, NextResponse } from 'next/server';

// Helper function to generate frame HTML using JSON format
const generateFrameHtml = (
  imageUrl: string,
  buttons: string[],
  postUrl: string,
  state?: string
) => {
  const frameContent = {
    version: "vNext",
    imageUrl,
    imageAspectRatio: "1.91:1",
    buttons: buttons.map((text, i) => ({
      title: text,
      action: {
        type: "post_redirect",
        target: postUrl
      }
    })),
    postUrl,
    state: state || undefined
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="fc:frame" content='${JSON.stringify(frameContent).replace(/'/g, "\\'")}' />
  <meta property="og:image" content="${imageUrl}" />
  <title>SI Unit Challenge</title>
  <meta property="og:title" content="SI Unit Challenge" />
  <meta property="og:description" content="Test your metric conversion skills against the clock!" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${process.env.NEXT_PUBLIC_APP_URL}" />
</head>
<body>
  <h1>SI Unit Challenge</h1>
  <p>Test your conversion skills!</p>
</body>
</html>
`;
};

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
