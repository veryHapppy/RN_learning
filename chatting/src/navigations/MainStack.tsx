import { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Channel, ChannelCreation } from "../screens";
import { MainStackParamList } from "./type";
import MainTab from "./MainTab";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigation from ".";

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: theme?.headerTintColor,
                cardStyle: { backgroundColor: theme?.background },

            }}
        >
            <Stack.Screen 
                name="Main" 
                component={MainTab} 
                options={({ navigation, route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? "Channels";
                    
                    return {
                        headerTitle: routeName,
                        headerRight: () => 
                            routeName === 'Channels' ? (
                                <MaterialCommunityIcons name="plus" size={26} style={{ marginRight: 15 }} onPress={() => navigation.navigate("Channel Creation")} />
                            ) : null
                    }
                }}/>    
            <Stack.Screen name="Channel Creation" component={ChannelCreation} />
            <Stack.Screen name="Channel" component={Channel} />        
        </Stack.Navigator>
    );
};

export default MainStack;