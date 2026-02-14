import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { DB, createMessage, getCurrentUser } from "../utils/firebase";
import styled, {ThemeContext} from "styled-components/native";
import { MainStackParamList } from "../navigations/type";
import { StackScreenProps } from '@react-navigation/stack';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Alert } from "react-native";
import { GiftedChat , Send, User, SendProps } from "react-native-gifted-chat";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background}
`;

interface messagesitem {
    _id: string | number,
    text: string,
    createdAt: number,
    user: User,
};
const SendButton = (props: SendProps<messagesitem>) => {
    const theme = useContext(ThemeContext);
    return (
        <Send
            {...props}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4,
            }}
        >
            <MaterialCommunityIcons
                name="send"
                size={24}
                color={
                    props.text ? theme?.sendButtonActivate : theme?.sendButtonInactivate
                }
            />
        </Send>
    );
};

type Channelprops = StackScreenProps<MainStackParamList, "Channel">;
const Channel = ({ navigation, route : { params }}: Channelprops) => {
    const theme = useContext(ThemeContext);
    const { uid, name, photoUrl } = getCurrentUser();
    const [messages, setMessages] = useState<messagesitem[]>([]);

    useEffect(() => {
            const q = query(
                collection(DB, "Channels", params.id, 'messages'),
                orderBy("createdAt", "desc")
            );
    
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const list: messagesitem[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    list.push({
                        _id: doc.id, 
                        text: data.text,
                        createdAt: data.createdAt || data.createAt,
                        user: data.user,
                    } as messagesitem);
                });
                setMessages(list);
            })
            
            return () => unsubscribe();
        }, []);

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: params.title || 'Channel'})
    }, []);

    const _handleMessageSend = async (messageList: any[] = []) => {
        const newMessage = messageList[0];
        try {
            await createMessage({channelId: params.id, message: newMessage});
        } catch (e) {
            if (e instanceof Error)
                Alert.alert("Send Message Error", e.message);
        }
    };

    return (
        <Container>
            <GiftedChat
                listProps={{
                    style: {backgroundColor: theme?.background},
                }}
                textInputProps= {{
                    placeholder:"Enter a message...",
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    textContentType: 'none',
                    underlineColorAndroid: 'transparent',
                    multiline: false,
                }}
                messages={messages}
                user={{_id: uid, name, avatar: photoUrl}}
                onSend={_handleMessageSend}
                isSendButtonAlwaysVisible={true}
                //renderUsernameOnMessage={true}
                renderSend={props => <SendButton {...props} />}
            />
        </Container>
    );
};

export default Channel;