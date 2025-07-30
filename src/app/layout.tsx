import './globals.css';
import FarcasterReady from '@/components/FarcasterReady';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/frame.png`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/frame.png`} />
        <meta property="fc:frame:post_url" content={`${process.env.NEXT_PUBLIC_APP_URL}/api/frame`} />
        <meta property="fc:frame:button:1" content="Easy (20s)" />
        <meta property="fc:frame:button:1:action" content="post_redirect" />
        <meta property="fc:frame:button:2" content="Medium (15s)" />
        <meta property="fc:frame:button:2:action" content="post_redirect" />
        <meta property="fc:frame:button:3" content="Hard (10s)" />
        <meta property="fc:frame:button:3:action" content="post_redirect" />
        <title>SI Unit Challenge</title>
      </head>
      <body>
        {children}
        <FarcasterReady />
      </body>
    </html>
  );
}
