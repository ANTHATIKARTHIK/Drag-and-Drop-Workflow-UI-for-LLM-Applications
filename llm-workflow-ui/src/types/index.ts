export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export interface NodeData {
  input?: string;
  output?: string;
  model?: string;
  apiKey?: string;
  maxTokens?: number;
  temperature?: number;
  onChange?: (value: string) => void;
  onModelChange?: (value: string) => void;
  onApiKeyChange?: (value: string) => void;
  onMaxTokensChange?: (value: number) => void;
  onTemperatureChange?: (value: number) => void;
}