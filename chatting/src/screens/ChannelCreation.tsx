import styled from 'styled-components/native';
import { Text, Button } from 'react-native';
import { MainStackParamList } from "../navigations/type";
import { StackScreenProps } from '@react-navigation/stack';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

type props = StackScreenProps<MainStackParamList, "Channel Creation">;
const ChannelCreation = ({ navigation }: props) => {
    return (
        <Container>
            <Text style={{fontSize: 24}}>Channel Creation</Text>
            <Button title="Channel" onPress={() => navigation.navigate("Channel")} />
        </Container>
    );
};

export default ChannelCreation;