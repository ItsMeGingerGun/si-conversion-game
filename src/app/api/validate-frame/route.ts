import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    "isValid": true,
    "message": {
      "version": "vNext",
      "image": `${process.env.NEXT_PUBLIC_APP_URL}/frame.png`,
      "imageAspectRatio": "1.91:1",
      "buttons": [
        {"label": "Easy (20s)", "action": "post_redirect"},
        {"label": "Medium (15s)", "action": "post_redirect"},
        {"label": "Hard (10s)", "action": "post_redirect"}
      ],
      "postUrl": `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`,
      "framesUrl": `${process.env.NEXT_PUBLIC_APP_URL}`
    }
  });
}
