export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-500 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="z-10 text-center">
        <p className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-3">No more awkward IOUs</p>
        <h1 className="text-5xl font-bold mb-4">💸 Bill Splitter</h1>
        <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
          Split bills with friends and roommates. Simple, fair, and stress-free.
        </p>

        <div className="flex gap-4 justify-center">
          <a href="/groups" className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-xl font-bold transition">
            View Groups
          </a>
          <a href="/groups/new" className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition">
            + Create Group
          </a>
        </div>
      </div>

    </main>
  );
}