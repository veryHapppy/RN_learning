import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import {RootStackParamList} from '../navigations/Stack';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const StyledText = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
`;

type Props = StackScreenProps<RootStackParamList, 'Item'>;

const Item = ({route, navigation}: Props) => {
    const { id, name } = route.params;
    return (
        <Container>
            <StyledText>ID: {id}</StyledText>
            <StyledText>Name: {name}</StyledText>
        </Container>
    )
}

export default Item;