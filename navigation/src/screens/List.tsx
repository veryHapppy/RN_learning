import { Button } from 'react-native';
import styled from 'styled-components/native';
import { NavigationProp } from '@react-navigation/native';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const StyledText = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
`;

const items = [
    { _id: '1', name: 'React Native' },
    { _id: '2', name: 'Expo' },
    { _id: '3', name: 'JavaScript' },
]

interface Item {
    _id: string;
    name: string; 
}

const List = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const _onPress = (item: Item) => {
        navigation.navigate('Item', { id:item._id, name:item.name });
    };

    return (
        <Container>
        <StyledText>List</StyledText>
        {items.map(item => (
            <Button
                key={item._id}
                title={item.name}
                onPress={() => _onPress(item)}
            />
        ))}
        </Container>
    );
};

export default List;