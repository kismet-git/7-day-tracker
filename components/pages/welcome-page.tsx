export function WelcomePage() {
  return (
    <div className="h-full flex flex-col p-8">
      <div className="max-w-2xl mx-auto">
        {/* Icon */}
        <div className="text-4xl mb-6 text-center">👋</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Welcome to Your AI Journey</h2>

        {/* Content */}
        <div className="text-base text-gray-700 space-y-3 mb-6">
          <p>
            This isn't a course or complicated tutorial. It's simply 7 days of trying ChatGPT with one small task each
            day.
          </p>
          <p>
            Each day, you'll get a simple prompt to try. Use it, see what happens, and jot down your thoughts. That's
            it.
          </p>
        </div>

        {/* Prompt Building Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-lg">🎯 The Secret to Great Prompts</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Context:</strong> Give ChatGPT background info ("I'm a marketing manager...")
            </p>
            <p>
              <strong>Details:</strong> Be specific about what you want ("3 bullet points, professional tone")
            </p>
            <p>
              <strong>Goal:</strong> Explain what you'll use it for ("for a client presentation")
            </p>
          </div>
          <div className="mt-3 p-3 bg-white rounded border-l-4 border-blue-400">
            <p className="text-sm text-gray-600 italic">
              Example: "I'm a marketing manager preparing for a client meeting. Help me summarize this 5-page report
              into 3 key bullet points that highlight our main recommendations."
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">How to use this guide:</h3>
          <ol className="text-sm text-gray-700 space-y-1">
            <li>1. Read the daily task and try the main prompt</li>
            <li>2. Use the follow-up tips to dig deeper</li>
            <li>3. Write your response in the space provided</li>
            <li>4. Move on to tomorrow</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
