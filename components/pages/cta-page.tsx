export function CTAPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-50 to-white">
      {/* Celebration Icon */}
      <div className="text-6xl mb-6">🎉</div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Congratulations!</h2>

      <p className="text-xl text-gray-700 mb-8 text-center max-w-md">
        You've completed your 7-day ChatGPT habit builder. You're now ready to take your AI skills to the next level.
      </p>

      {/* CTA Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md w-full text-center shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready for More?</h3>
        <p className="text-gray-600 mb-6">
          Get access to our complete Prompt Pack with 1000+ proven prompts for every situation.
        </p>

        {/* CTA Button Placeholder */}
        <div className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg mb-4">Get the Full Prompt Pack</div>

        <div className="text-sm text-gray-500">Visit: prompts.aibeginnermode.com</div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <div className="text-sm text-gray-500">Keep building your AI confidence, one prompt at a time.</div>
        <div className="text-xs text-gray-400 mt-2">AI Beginner Mode</div>
      </div>
    </div>
  )
}
