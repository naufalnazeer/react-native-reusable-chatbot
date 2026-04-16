import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chatbot, type ChatMessage } from 'react-native-reusable-chatbot';

export const _messages: ChatMessage[] = [
  {
    _id: '1',
    text: 'Hello! How can I help you?',
    createdAt: new Date('2026-04-10T10:00:00'),
    user: { _id: 2, name: 'Bot' },
    type: 'text',
  },
  {
    _id: '2',
    text: 'I want to upload a document',
    createdAt: new Date('2026-04-10T10:01:00'),
    user: { _id: 1, name: 'You' },
    type: 'text',
  },
  {
    _id: '3',
    text: 'document.pdf',
    createdAt: new Date('2026-04-10T10:02:00'),
    user: { _id: 2 },
    type: 'file',
    fileUrl: 'https://example.com/document.pdf',
  },
  {
    _id: '4',
    createdAt: new Date('2026-04-10T10:03:00'),
    user: { _id: 1 },
    type: 'audio',
    audioUrl: 'https://example.com/audio.mp4',
  },
];


export default function App() {

  const [messages, setMessages] = useState(_messages)
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = (msgs) => {
      setMessages(prev => [...prev, ...msgs]);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }

  return (
    <View style={styles.container}>
      <Chatbot messages={messages} userId={1} isBotLoading={isTyping} language='en'>
        <Chatbot.Header title="Support" />
        <Chatbot.Messages  />
        <Chatbot.Input onSend={handleSend} enableVoice placeholder='Ask me anything...' />
      </Chatbot>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
