import axios from 'axios';

const RAG_API_URL = process.env.NEXT_PUBLIC_RAG_API_URL || 'http://localhost:8000';

const ragClient = axios.create({
  baseURL: RAG_API_URL,
  timeout: 60000,
});

export interface AskResponse {
  question: string;
  answer: string;
  context_used: string[];
  model: string;
}

export interface StartupPlanResponse {
  startup_plan: string;
  context_used: string[];
  model: string;
}

export interface StrategiesResponse {
  strategies: string;
  context_used: string[];
  model: string;
}

export interface HealthResponse {
  status: string;
  message: string;
}

// Health check
export const checkHealth = async (): Promise<HealthResponse> => {
  const response = await ragClient.get('/health');
  return response.data;
};

// Ask RAG question
export const askQuestion = async (question: string): Promise<AskResponse> => {
  const response = await ragClient.post('/ask', { question });
  return response.data;
};

// Generate startup plan
export const generateStartupPlan = async (ideaDescription: string): Promise<StartupPlanResponse> => {
  const response = await ragClient.post('/startup-plan', { idea_description: ideaDescription });
  return response.data;
};

// Generate strategies
export const generateStrategies = async (topic: string): Promise<StrategiesResponse> => {
  const response = await ragClient.post('/strategies', { topic });
  return response.data;
};

// Generate document
export const generateDocument = async (
  documentType: string,
  topic: string
): Promise<{ document_type: string; content: string; context_used: string[] }> => {
  const response = await ragClient.post('/generate-document', {
    document_type: documentType,
    topic,
  });
  return response.data;
};

// Batch ask questions
export const batchAskQuestions = async (questions: string[]): Promise<AskResponse[]> => {
  const response = await ragClient.post('/batch-ask', { questions });
  return response.data;
};
