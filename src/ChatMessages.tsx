import { FlatList, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useChatbotContext, windowWidth } from './Chatbot';
import type { TextStyle } from 'react-native';

export interface ChatMessages {
    inputTextStyle?: TextStyle;
}

const bubbleMaxWidth = windowWidth * 0.75;

export const ChatMessages: React.FC<ChatMessages> = ({ inputTextStyle }) => {
    const { messages, flatListRef, userId, isBotLoading } = useChatbotContext();

    const renderMessageContent = (item: any, isMe: boolean) => {
        const textColor = isMe ? '#FFF' : '#000';

        switch (item.type) {
            case 'audio':
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, marginRight: 8 }}>▶️</Text>
                        <View style={{ flex: 1 }}>
                            <View style={{ height: 3, backgroundColor: isMe ? 'rgba(255,255,255,0.4)' : '#CCC', borderRadius: 2 }} />
                            <Text style={{ fontSize: 10, color: textColor, marginTop: 4 }}>Voice Message</Text>
                        </View>
                    </View>
                );
            case 'file':
                return (
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isMe ? 'rgba(0,0,0,0.1)' : '#F0F0F0', padding: 8, borderRadius: 8 }}>
                        <Text style={{ fontSize: 20, marginRight: 10 }}>📄</Text>
                        <View style={{ flex: 1 }}>
                            <Text numberOfLines={1} style={{ color: textColor, fontWeight: 'bold', fontSize: 13 }}>{item.text}</Text>
                            <Text style={{ color: textColor, fontSize: 10 }}>Tap to view</Text>
                        </View>
                    </TouchableOpacity>
                );
            default:
                return <Text style={[{ color: textColor }, inputTextStyle]}>{item.text}</Text>;
        }
    };

    return (
        <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={{ paddingHorizontal: windowWidth * 0.04, paddingVertical: 20, }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            renderItem={({ item }) => {
                const isMe = item.user?._id === userId;
                return (
                    <View style={{ maxWidth: bubbleMaxWidth, padding: 12, borderRadius: 18, marginBottom: 10, alignSelf: isMe ? 'flex-end' : 'flex-start', backgroundColor: isMe ? '#007AFF' : '#FFF', borderBottomRightRadius: isMe ? 2 : 18, borderBottomLeftRadius: isMe ? 18 : 2, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, }}>
                        {renderMessageContent(item, isMe)}
                    </View>
                );
            }}
            ListFooterComponent={isBotLoading ? (
                <View style={{ alignSelf: 'flex-start', padding: 12, backgroundColor: '#E9E9EB', borderRadius: 18, marginLeft: windowWidth * 0.04, marginBottom: 10 }}>
                    <ActivityIndicator size="small" color="#999" />
                </View>
            ) : undefined}
        />
    );
};