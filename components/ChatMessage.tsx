'use client';

import { ChatMessage as ChatMessageType } from '@/lib/types';
import { MessageCircle, Lightbulb, Zap, FileText } from 'lucide-react';
import { JSX } from 'react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  const parseAndFormatContent = (content: string) => {
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    // Match both code blocks and headings
    const regex = /```[\s\S]*?```|###\s+.+/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      // Add text before this match
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }

      // Handle code blocks
      if (match[0].startsWith('```')) {
        const code = match[0].slice(3, -3).trim();
        parts.push(
          <div key={`code-${parts.length}`} className="bg-white rounded p-2 my-2 overflow-x-auto">
            <pre className="text-gray-900 text-xs font-mono whitespace-pre-wrap break-words">
              {code}
            </pre>
          </div>
        );
      }
      // Handle headings
      else if (match[0].startsWith('###')) {
        const heading = match[0].replace(/^###\s+/, '').trim();
        parts.push(
          <h2 key={`h2-${parts.length}`} className="text-lg font-bold mt-2 mb-1">
            {heading}
          </h2>
        );
      }
      else if (match[0].startsWith('**')) {
        const heading = match[0].replace(/^\*\*\s+/, '').trim();
        parts.push(
          <h2 key={`h2-${parts.length}`} className="text-lg font-bold mt-2 mb-1">
            {heading}
          </h2>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts.length > 0 ? parts : content;
  };
  
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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 p-4`}>
      <div
        className={`max-w-[70%] rounded-lg p-4 ${
          isUser
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-gray-200 text-gray-900 shadow-lg'
        }`}
      >
        <div className="flex items-start gap-2 mmb-2">
          <div className={isUser ? 'text-blue-200' : 'text-gray-500'}>
            {getIcon()}
          </div>
          <div className="text-xs opacity-75">
            {formatTime(message.timestamp)}
          </div>
        </div>
        <div className="text-sm whitespace-pre-wrap">
          {parseAndFormatContent(message.content)}
        </div>
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
