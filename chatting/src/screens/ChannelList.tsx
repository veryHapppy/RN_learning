import { useContext, memo, useState, useEffect } from "react";
import styled, { ThemeContext} from "styled-components/native";
import { FlatList } from "react-native";
import { MainStackParamList } from "../navigations/type";
import { StackScreenProps } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DB } from '../utils/firebase'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import moment from "moment";

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;
const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.listBorder};
    padding: 15px 20px
`;
const ItemTextContainer = styled.View`
    flex: 1;
    flex-direction: column;
`;
const ItemTitle = styled.Text`
    font-size: 20px;
    font-weight: 600;
`;
const ItemDescription = styled.Text`
    font-size: 20px;
    font-weight: 600;
`;
const ItemTime = styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.listTime};
`;

interface Channelitem {
    id:string, title:string, description:string, createdAt:number
};

const getDateOrTime = (ts:number) => {
    const now = moment().startOf("day");
    const target = moment(ts).startOf("day");
    return moment(ts).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm')
};

interface OnPressProps {
    id:string, 
    title:string,
};
interface ItemProps {
    item: {id:string, title:string, description:string, createdAt:number},
    onPress: ({id, title} :OnPressProps) => void,
};
const Item = memo(({item:{ id, title, description, createdAt }, onPress}: ItemProps) => {
    const theme = useContext(ThemeContext);
    console.log(`Item: ${id}`);
    
    return (
        <ItemContainer onPress={() => onPress({ id, title})}>
            <ItemTextContainer>
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription>{description}</ItemDescription>
            </ItemTextContainer>
            <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
            <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={theme?.listIcon}
            />
        </ItemContainer>
    );
});

type props = StackScreenProps<MainStackParamList, "Channels">;
const ChannelList = ({ navigation }: props) => {
    const [channels, setChannels] = useState<Channelitem[]>([])

    useEffect(() => {
        const q = query(
            collection(DB, "Channels"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list: Channelitem[] = [];
            snapshot.forEach((doc) => {
                list.push(doc.data() as Channelitem);
            });
            setChannels(list);
        })
        
        return () => unsubscribe();
    }, []);


    const _handleItemPress = (params:OnPressProps)  => {
        navigation.navigate("Channel", params);
    };

    return (
        <Container>
            <FlatList
                keyExtractor={item => item['id']}
                data={channels}
                renderItem={({ item }) => (
                    <Item item={item} onPress={_handleItemPress} />
                )}
            />
        </Container>
    );
};

export default ChannelList;