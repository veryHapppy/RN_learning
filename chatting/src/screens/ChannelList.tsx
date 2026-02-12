import styled from "styled-components/native";
import { Text, Button } from "react-native";
import { MainStackParamList } from "../navigations/type";
import { StackScreenProps } from '@react-navigation/stack';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background}
`;

type props = StackScreenProps<MainStackParamList, "ChannelList">;
const ChannelList = ({ navigation }: props) => {
    return (
        <Container>
            <Text style={{ fontSize: 24 }}>Channel List</Text>
            <Button
                title="Channel Creation"
                onPress={() => navigation.navigate("Channel Creation")} />
        </Container>
    );
};

export default ChannelList;