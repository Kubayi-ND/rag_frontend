'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { ChatMessage as ChatMessageType } from '@/lib/types';
import {
  askQuestion,
  generateStartupPlan,
  generateStrategies,
  generateDocument,
  checkHealth,
} from '@/lib/api';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check API health on mount
  useEffect(() => {
    const checkAPI = async () => {
      try {
        await checkHealth();
        setApiStatus('connected');
        setMessages([
          {
            id: '1',
            role: 'assistant',
            content:
              'Welcome to the RAG Startup Advisor! 🚀\n\nI can help you with:\n• Answering startup questions\n• Generating comprehensive startup plans\n• Providing strategic recommendations\n• Creating business documents\n\nWhat would you like to know?',
            timestamp: new Date(),
            type: 'question',
          },
        ]);
      } catch (error) {
        setApiStatus('error');
        setErrorMessage(
          'Failed to connect to RAG API. Make sure the backend is running on http://localhost:8000'
        );
      }
    };

    checkAPI();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string, type: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      type: type as 'question' | 'startup-plan' | 'strategies' | 'document',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setErrorMessage('');

    try {
      let response;
      let assistantContent = '';
      let contextUsed: string[] = [];

      if (type === 'startup-plan') {
        response = await generateStartupPlan(content);
        assistantContent = response.startup_plan;
        contextUsed = response.context_used;
      } else if (type === 'strategies') {
        response = await generateStrategies(content);
        assistantContent = response.strategies;
        contextUsed = response.context_used;
      } else if (type === 'document') {
        response = await generateDocument('pitch_deck', content);
        assistantContent = response.content;
        contextUsed = response.context_used;
      } else {
        response = await askQuestion(content);
        assistantContent = response.answer;
        contextUsed = response.context_used;
      }

      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
        contextUsed,
        type: type as 'question' | 'startup-plan' | 'strategies' | 'document',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Failed to get response from AI';
      setErrorMessage(errorMsg);

      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ Error: ${errorMsg}\n\nMake sure the RAG API is running at http://localhost:8000`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">RAG Startup Advisor</h1>
            <p className="text-blue-100 text-sm">Powered by Ollama & ChromaDB</p>
          </div>
          <div className="flex items-center gap-2">
            {apiStatus === 'checking' && (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span className="text-sm">Connecting...</span>
              </>
            )}
            {apiStatus === 'connected' && (
              <>
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-sm">Connected</span>
              </>
            )}
            {apiStatus === 'error' && (
              <>
                <AlertCircle className="w-5 h-5 text-red-300" />
                <span className="text-sm">Disconnected</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Status Alert */}
      {apiStatus === 'error' && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4 rounded">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800">API Connection Error</h3>
              <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
              <p className="text-red-600 text-xs mt-2">
                Start the RAG API with: <code className="bg-red-100 px-2 py-1 rounded">uvicorn main:app --reload</code>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 max-w-6xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <Loader className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p>Loading chat interface...</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="max-w-6xl mx-auto w-full">
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={apiStatus !== 'connected'}
        />
      </div>
    </div>
  );
}
