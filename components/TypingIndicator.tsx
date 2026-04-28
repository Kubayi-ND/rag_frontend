'use client';

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-4 bg-gray-200 text-gray-900 rounded-lg rounded-bl-none w-fit">
      <div className="flex gap-1">
        <span
          className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
          style={{ animationDelay: '0s' }}
        />
        <span
          className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
          style={{ animationDelay: '0.2s' }}
        />
        <span
          className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
          style={{ animationDelay: '0.4s' }}
        />
      </div>
      <span className="text-xs text-gray-600 ml-2">AI is thinking...</span>
    </div>
  );
}
