import { createContext, useState, useRef, useContext } from 'react';
import { View, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import type { ChatbotProps, ChatContextType } from './types';

export const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const colors ={
    background: '#FFF',
    textInput: '#F0F0F0',
    sendButton: '#007AFF',
    sendButtonText: '#FFF',
    headerBackground: '#FFF',
    headerText: '#000',
    botMessageBackground: '#E1E1E1',
    userMessageBackground: '#007AFF',
    botMessageText: '#000',
    userMessageText: '#FFF',
}

const ChatbotContext = createContext<ChatContextType | undefined>(undefined);

export const useChatbotContext = () => {
  const context = useContext(ChatbotContext);
  if (!context)
    throw new Error('Chatbot sub-components must be used within <Chatbot />');
  return context;
};

export const Chatbot = ({ children, messages, userId, containerStyle, isBotLoading, language }: ChatbotProps) => {
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const value = { messages, userId, inputText, setInputText, flatListRef, isBotLoading, language };

  return (
    <ChatbotContext.Provider value={value}>
      <View style={[{ backgroundColor: colors.background,  overflow:'hidden', height:'100%' }, containerStyle]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          style={{ flex: 1 }}
        >
          {children}
        </KeyboardAvoidingView>
      </View>
    </ChatbotContext.Provider>
  );
};
