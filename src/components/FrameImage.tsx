export default function FrameImage() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white p-8">
      <h1 className="text-5xl font-bold mb-6">SI Unit Challenge</h1>
      <p className="text-2xl mb-8">Test your conversion skills!</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/20 p-4 rounded-lg text-center">Easy (20s)</div>
        <div className="bg-white/20 p-4 rounded-lg text-center">Medium (15s)</div>
        <div className="bg-white/20 p-4 rounded-lg text-center">Hard (10s)</div>
      </div>
    </div>
  );
}
