import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { colors, useChatbotContext, windowHeight } from './Chatbot';
import { microphone, send } from './assets';

export interface InputProps {
  onSend: (message: any) => void;
  placeholder?: string;
  enableUpload?: boolean;
  enableVoice?: boolean;
  inputFontSize?: number;
  uploadIcon?: React.ReactNode;
  sendIcon?: React.ReactNode;
  micIcon?: React.ReactNode;
  stopIcon?: React.ReactNode;
  handleUpload?: () => void;
  handleVoice?: () => void;
  recording?: boolean;
}

export const ChatInput = ({ onSend, placeholder, enableUpload, enableVoice, inputFontSize, uploadIcon, sendIcon, micIcon, stopIcon, handleUpload, handleVoice, recording }: InputProps) => {
  const { inputText, setInputText, userId } = useChatbotContext();

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSend([{ _id: Date.now().toString(), text: inputText, createdAt: new Date(), user: { _id: userId }, type: 'text' }]);
    setInputText('');
  };

  return (
           <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE', }}>
                    {enableUpload && (
                        <TouchableOpacity onPress={handleUpload} style={{ padding: 5 }}>
                            {uploadIcon || <Text style={{ fontSize: 24 }}>📎</Text>}
                        </TouchableOpacity>
                    )}
                    
                    <View style={{ flex: 1, backgroundColor: '#F0F0F0', borderRadius: 20, height: windowHeight * 0.12, justifyContent:'flex-start'  }}>
                        <TextInput 
                            style={{ paddingHorizontal: 12, fontSize: inputFontSize, maxHeight: windowHeight * 0.120, paddingVertical:12 }}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder={placeholder || "Type a message..."}
                            multiline
                        />
                    </View>

                    {inputText.length > 0 ? (
                        <TouchableOpacity onPress={handleSend} style={{ paddingHorizontal: 10 }}>
                            {sendIcon || <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <Image source={send} style={{tintColor: colors.userMessageBackground}} />
                                <Text style={{ color: '#007AFF', fontWeight: 'bold', fontSize: 16 }}>Send</Text>
                                </View>}
                        </TouchableOpacity>
                    ) : (
                        enableVoice && (
                            <TouchableOpacity onPress={handleVoice} style={{ padding: 5 }}>
                                {recording
                                    ? (stopIcon || <Text style={{ fontSize: 24 }}>⏹</Text>)
                                    : (micIcon || <Image source={microphone} style={{tintColor: colors.userMessageBackground}} />)
                                }
                            </TouchableOpacity>
                        )
                    )}
                </View>
  );
};
