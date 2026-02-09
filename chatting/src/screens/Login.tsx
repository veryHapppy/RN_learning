import styled from "styled-components/native";
import { Text, Button } from 'react-native';
import { AuthStackParamList } from "../navigations/type";
import { StackScreenProps } from '@react-navigation/stack';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background}
`;

type props = StackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({ navigation }: props) => {
    return (
        <Container>
            <Text style={{ fontSize: 30}}>Login Screen</Text>
            <Button title="SignUp" onPress={() => navigation.navigate('SignUp')} />
        </Container>
    );
};

export default Login;