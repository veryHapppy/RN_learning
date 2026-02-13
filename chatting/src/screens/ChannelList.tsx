import { useContext } from "react";
import styled, { ThemeContext} from "styled-components/native";
import { FlatList } from "react-native";
import { MainStackParamList } from "../navigations/type";
import { StackScreenProps } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
const channels: Channelitem[] = [];
for (let idx=0;idx<1000;idx++) {
    channels.push({
        id: idx.toString(),
        title: `title ${idx}`,
        description: `description ${idx}`,
        createdAt: idx,
    });
}
interface OnPressProps {
    id:string, 
    title:string,
};
interface ItemProps {
    item: {id:string, title:string, description:string, createdAt:number},
    onPress: ({id, title} :OnPressProps) => void,
};
const Item = ({item:{ id, title, description, createdAt }, onPress}: ItemProps) => {
    const theme = useContext(ThemeContext);
    console.log(`Item: ${id}`);
    
    return (
        <ItemContainer onPress={() => onPress({ id, title})}>
            <ItemTextContainer>
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription>{description}</ItemDescription>
            </ItemTextContainer>
            <ItemTime>{createdAt}</ItemTime>
            <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={theme?.listIcon}
            />
        </ItemContainer>
    );
};

type props = StackScreenProps<MainStackParamList, "Channels">;
const ChannelList = ({ navigation }: props) => {
    const _handleItemPress = (params:OnPressProps)  => {
        navigation.navigate("Channel", params);
    };

    return (
        <Container>
            <FlatList
                keyExtractor={item => item['id'].toString()}
                data={channels}
                renderItem={({ item }) => (
                    <Item item={item} onPress={_handleItemPress} />
                )}
            />
        </Container>
    );
};

export default ChannelList;