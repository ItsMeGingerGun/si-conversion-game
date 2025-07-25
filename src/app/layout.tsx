import './globals.css';
import FarcasterReady from '@/components/FarcasterReady';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <FarcasterReady />
      </body>
    </html>
  );
}
