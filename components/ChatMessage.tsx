'use client';

import { ChatMessage as ChatMessageType } from '@/lib/types';
import { MessageCircle, Lightbulb, Zap, FileText } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  };

  const getIcon = () => {
    switch (message.type) {
      case 'startup-plan':
        return <Lightbulb className="w-4 h-4" />;
      case 'strategies':
        return <Zap className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg p-4 ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-900 rounded-bl-none'
        }`}
      >
        <div className="flex items-start gap-2 mb-2">
          <div className={isUser ? 'text-blue-200' : 'text-gray-500'}>
            {getIcon()}
          </div>
          <div className="text-xs opacity-75">
            {formatTime(message.timestamp)}
          </div>
        </div>
        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
        {message.contextUsed && message.contextUsed.length > 0 && (
          <div className={`mt-3 pt-3 border-t ${isUser ? 'border-blue-500' : 'border-gray-300'}`}>
            <p className="text-xs font-semibold opacity-75">Sources:</p>
            <ul className="text-xs list-disc list-inside opacity-70 mt-1">
              {message.contextUsed.slice(0, 3).map((context, idx) => (
                <li key={idx} className="truncate">
                  {context.substring(0, 50)}...
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
