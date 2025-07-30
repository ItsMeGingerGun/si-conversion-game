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
        <title>SI Unit Challenge</title>
      </head>
      <body>
        {children}
        <FarcasterReady />
      </body>
    </html>
  );
}
