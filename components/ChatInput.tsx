'use client';

import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string, type: string) => Promise<void>;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({
  onSendMessage,
  isLoading,
  disabled = false,
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const [messageType, setMessageType] = useState('question');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || disabled) return;

    const message = input.trim();
    setInput('');
    await onSendMessage(message, messageType);
  };

  return (
    <div className="border-t border-gray-300 p-4 bg-gray-50">
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          onClick={() => setMessageType('question')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            messageType === 'question'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={isLoading || disabled}
        >
          Ask Question
        </button>
        <button
          onClick={() => setMessageType('startup-plan')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            messageType === 'startup-plan'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={isLoading || disabled}
        >
          Generate Plan
        </button>
        <button
          onClick={() => setMessageType('strategies')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            messageType === 'strategies'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={isLoading || disabled}
        >
          Get Strategies
        </button>
        <button
          onClick={() => setMessageType('document')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            messageType === 'document'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={isLoading || disabled}
        >
          Generate Doc
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            messageType === 'question'
              ? 'Ask a startup question...'
              : messageType === 'startup-plan'
              ? 'Describe your startup idea...'
              : messageType === 'strategies'
              ? 'Enter a topic for strategies...'
              : 'Enter document title...'
          }
          disabled={isLoading || disabled}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim() || disabled}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          {isLoading ? (
            <span className="animate-spin">⟳</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send
            </>
          )}
        </button>
      </form>

      {isLoading && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>AI is thinking...</span>
        </div>
      )}
    </div>
  );
}
