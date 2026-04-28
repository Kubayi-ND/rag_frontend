export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  contextUsed?: string[];
  type?: 'question' | 'startup-plan' | 'strategies' | 'document';
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface APIConfig {
  baseUrl: string;
  timeout: number;
}
