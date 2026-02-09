import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, SignUp } from '../screens';
import { AuthStackParamList } from './type';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    const theme = useContext(ThemeContext);
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerTitleAlign: 'center',
                cardStyle: {backgroundColor: theme?.background},
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
};

export default AuthStack;