// src/app/frame/debug/page.tsx
'use client';

export default function FrameDebugPage() {
  return (
    <div>
      <h1>Frame Debugger</h1>
      <iframe 
        src="/frame" 
        className="w-full h-screen border"
      />
    </div>
  );
}
