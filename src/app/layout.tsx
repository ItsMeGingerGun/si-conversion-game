import './globals.css';
import FarcasterReady from '@/components/FarcasterReady';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
        <FarcasterReady />
      </body>
    </html>
  );
}
