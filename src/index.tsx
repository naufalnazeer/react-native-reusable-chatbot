import { Chatbot as MainWrapper } from './Chatbot';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { View, Text } from 'react-native';
import type {InputProps} from './ChatInput';
import type { ViewStyle, TextStyle } from 'react-native';

interface ChatbotComponent extends React.FC<any> {
  Header: React.FC<{ title: string; style?: ViewStyle; textStyle?: TextStyle }>;
  Messages: typeof ChatMessages;
  Input: React.FC<InputProps>;
}

const ChatHeader = ({ title, style, textStyle }: any) => (
  <View style={[{ height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' }, style]}>
    <Text style={[{ fontSize: 18, fontWeight: 'bold' }, textStyle]}>{title}</Text>
  </View>
);

export const Chatbot = Object.assign(MainWrapper, {
  Header: ChatHeader,
  Messages: ChatMessages,
  Input: ChatInput,
}) as ChatbotComponent;

export * from './types';