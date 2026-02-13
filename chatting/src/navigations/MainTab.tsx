import { useContext, useEffect, useLayoutEffect, useCallback } from "react";
import {createBottomTabNavigator, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Profile, ChannelList } from "../screens";
import { MainStackParamList } from "./type";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from "styled-components/native";

const Tab = createBottomTabNavigator<MainStackParamList>();

interface IconProps {
    focused: boolean,
    name: string,
};
const tabBarIcon = ({focused, name}: IconProps) => {
    const theme = useContext(ThemeContext);
    return (
        <MaterialCommunityIcons
            name={name}
            size={26}
            color={focused ? theme?.tabActiveColor : theme?.tabInactiveColor}
        />
    );
};

const MainTab = () => {
    const theme = useContext(ThemeContext);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme?.tabActiveColor,
                tabBarInactiveTintColor: theme?.tabInactiveColor,
            }}>
            <Tab.Screen name="Channels" component={ChannelList} 
                options={{
                    tabBarIcon: ({ focused }) => 
                        tabBarIcon({
                            focused,
                            name: focused ? 'chat' : 'chat-outline',
                        })
                }}/>
            <Tab.Screen name="Profile" component={Profile} 
                options={{
                    tabBarIcon: ({ focused }) => 
                        tabBarIcon({
                            focused,
                            name: focused ? 'account' : 'account-outline',
                        })
                }}/>
        </Tab.Navigator>
    );
};

export default MainTab;