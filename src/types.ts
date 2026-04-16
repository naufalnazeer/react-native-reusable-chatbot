import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export type MessageType = 'text' | 'audio' | 'file';

export interface ChatMessage {
  _id: string | number;
  text: string;
  createdAt: Date;
  user: {
    _id: string | number;
    name?: string;
    avatar?: string;
  };
  type?: MessageType;
  audioUrl?: string;
  fileUrl?: string;
}

export interface ChatbotProps {
  children: ReactNode;
  messages: ChatMessage[];
  userId: string | number;
  language: 'ar' | 'en';
  containerStyle?: ViewStyle;
  isBotLoading: boolean;
}

export interface ChatContextType {
  messages: ChatMessage[];
  userId: string | number;
  inputText: string;
  setInputText: (text: string) => void;
  language: 'ar' | 'en';
  flatListRef: React.RefObject<any>;
  isBotLoading: boolean;
}
