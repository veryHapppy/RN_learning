import { useState, useRef } from "react";
import styled from "styled-components/native";
import { AuthStackParamList } from "../navigations/type";
import { StackScreenProps } from '@react-navigation/stack';
import { Image, Input } from '../components';
import { images } from '../utils/images'

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 20px;
`;

type props = StackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({ navigation }: props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef<any>(null);

    return (
        <Container>
            <Image uri={images.logo}/>
            <Input
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                onSubmitEditing={()=>passwordRef.current.focus()}
                placeholder="Email"
                returnKeyType="next"
            />
            <Input
                ref={passwordRef}
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                onSubmitEditing={()=>{}}
                placeholder="Password"
                returnKeyType="done"
                isPassword
            />
        </Container>
    );
};

export default Login;