export function CoverPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center p-12 bg-gradient-to-br from-yellow-50 to-white">
      {/* Hero Image Placeholder */}
      <div className="w-48 h-32 mb-8 bg-yellow-100 rounded-lg flex items-center justify-center border-2 border-dashed border-yellow-300">
        <div className="text-center">
          <div className="text-4xl mb-2">🤖</div>
          <div className="text-sm text-gray-600">Hero Image</div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 leading-tight">
        Your 7-Day
        <br />
        <span className="text-yellow-500">ChatGPT</span>
        <br />
        Habit Builder
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-gray-600 text-center mb-8 max-w-md">No lessons. Just use it — and get better fast.</p>

      {/* Brand */}
      <div className="mt-auto">
        <div className="text-sm text-gray-500 text-center">AI Beginner Mode</div>
      </div>
    </div>
  )
}
