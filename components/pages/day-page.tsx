interface DayPageProps {
  day: number
  task: string
  context: string
  icon: string
  template: string
  templateExample: string
}

export function DayPage({ day, task, context, icon, template, templateExample }: DayPageProps) {
  const getFollowUpTips = (dayNumber: number) => {
    const tips = {
      1: [
        "Ask: 'Can you make this summary even shorter?'",
        "Try: 'What's the most important point here?'",
        "Follow up: 'Explain this like I'm explaining it to my boss'",
      ],
      2: [
        "Ask: 'Can you make this more/less formal?'",
        "Try: 'What if I need to say no politely?'",
        "Follow up: 'Help me add a call-to-action to this'",
      ],
      3: [
        "Ask: 'Can you give me a real-world example?'",
        "Try: 'What questions should I ask about this?'",
        "Follow up: 'How does this connect to [related topic]?'",
      ],
      4: [
        "Ask: 'What's the most important step to start with?'",
        "Try: 'How long should each step take?'",
        "Follow up: 'What could go wrong and how do I prevent it?'",
      ],
      5: [
        "Ask: 'Which approach would be fastest?'",
        "Try: 'What are the pros and cons of each?'",
        "Follow up: 'Help me choose between option 1 and 2'",
      ],
      6: [
        "Ask: 'What questions might they ask me?'",
        "Try: 'Help me practice my responses'",
        "Follow up: 'What if the conversation goes off-topic?'",
      ],
      7: [
        "Ask: 'What's the weakest part of this?'",
        "Try: 'How can I make this more persuasive?'",
        "Follow up: 'What would my audience want to know?'",
      ],
    }
    return tips[dayNumber as keyof typeof tips] || []
  }

  const followUpTips = getFollowUpTips(day)

  return (
    <div className="h-full flex flex-col p-6 text-sm">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="text-3xl mb-2">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Day {day}</h2>
      </div>

      {/* Task */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3">
        <h3 className="font-semibold text-gray-900 mb-1 text-sm">Today's Task:</h3>
        <p className="text-base text-gray-800 font-medium">{task}</p>
      </div>

      {/* Context */}
      <div className="mb-3">
        <p className="text-gray-700 text-sm leading-relaxed">{context}</p>
      </div>

      {/* Template */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">📝 Copy & Fill This Template:</h4>
        <div className="bg-white border rounded p-2 mb-2">
          <code className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">{template}</code>
        </div>
        <div className="text-xs text-gray-600">
          <strong>Example:</strong>
          <div className="bg-gray-50 border rounded p-2 mt-1">
            <code className="text-xs text-gray-600 whitespace-pre-wrap font-mono leading-relaxed">
              {templateExample}
            </code>
          </div>
        </div>
      </div>

      {/* Follow-up Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Don't Stop There - Try These Follow-ups:</h4>
        <ul className="space-y-1 text-xs text-gray-700">
          {followUpTips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Response Section */}
      <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-3">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Your Response:</h4>
        <div className="space-y-2">
          <div className="h-2 bg-gray-100 rounded w-3/4"></div>
          <div className="h-2 bg-gray-100 rounded w-full"></div>
          <div className="h-2 bg-gray-100 rounded w-2/3"></div>
          <div className="h-2 bg-gray-100 rounded w-5/6"></div>
          <div className="h-2 bg-gray-100 rounded w-1/2"></div>
        </div>
        <div className="mt-3 text-xs text-gray-500">Write your thoughts, results, or key takeaways here...</div>
      </div>
    </div>
  )
}
