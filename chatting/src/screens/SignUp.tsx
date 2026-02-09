import styled from 'styled-components/native';
import { Text } from 'react-native';
import { AuthStackParamList } from "../navigations/type";
import { StackScreenProps } from '@react-navigation/stack';
type props = StackScreenProps<AuthStackParamList, 'SignUp'>;

const Container = styled.View`
    flex: 1;
    justify-content: conter;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
`;

const SignUp = () => {
    return (
        <Container>
            <Text style={{ fontSize: 30 }}>SignUp Screen</Text>
        </Container>
    );
};

export default SignUp;