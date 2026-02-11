import { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { AuthStackParamList } from "../navigations/type";
import { StackScreenProps } from '@react-navigation/stack';
import { Image, Input, Button } from '../components';
import { images } from '../utils/images';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail, removeWhitespace } from "../utils/common"
import { Alert } from "react-native";
import { login } from "../utils/firebase"


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 20px;
`;
const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({theme})=>theme.errorText}
`;

type props = StackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({ navigation }: props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef<any>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage])

    const _handleEmailChange = (email: string) => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        setErrorMessage(
            validateEmail(changedEmail) ? '' : 'Please verify your email.'
        );
    };
    const _handlePasswordChange = (password: string) => {
        setPassword(removeWhitespace(password));
    };
    const _handleLoginButtonPress = async () => {
        try {
            const user = await login({ email, password });
            Alert.alert('Login Success', user.email || "");
        } catch (e) {
            if (e instanceof Error) {
                Alert.alert("Login Error", e.message)
            }
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1}}
            extraScrollHeight={30}
            enableOnAndroid={true}>
            <Container>
                <Image uri={images.logo}/>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={_handleEmailChange}
                    onSubmitEditing={()=>passwordRef.current.focus()}
                    placeholder="Email"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="Password"
                    value={password}
                    onChangeText={_handlePasswordChange}
                    onSubmitEditing={_handleLoginButtonPress}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button 
                    title="Login" 
                    onPress={_handleLoginButtonPress} 
                    disabled={disabled}
                />
                <Button
                    title="Sign up with email"
                    onPress = {() => navigation.navigate("SignUp")}
                    isFilled = {false}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Login;