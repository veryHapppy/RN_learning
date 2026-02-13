import styled from "styled-components/native";
import { Text } from "react-native";
import { MainStackParamList } from "../navigations/type";
import { StackScreenProps } from '@react-navigation/stack';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background}
`;

type props = StackScreenProps<MainStackParamList, "Channel">;
const Channel = ({ route }: props) => {
    return (
        <Container>
            <Text style={{ fontSize: 24 }}>ID: {route.params?.id}</Text>
            <Text style={{ fontSize: 24 }}>Title: {route.params?.title}</Text>
        </Container>
    );
};

export default Channel;