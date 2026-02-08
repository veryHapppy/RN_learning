import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Mail, Meet, Settings } from "../screens/TabScreens";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps {
    name: string,
    size: number,
    color: string
};

const TabIcon = ({name, size, color}: IconProps) => {
    return <MaterialCommunityIcons name={name} size={size} color={color}/>
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Settings">
            <Tab.Screen 
                name="Mail" 
                component={Mail} 
                options={{
                    tabBarIcon: props => TabIcon({...props, name:'email'})
                    }}
            />
            <Tab.Screen 
                name="Meet" 
                component={Meet} 
                options={{
                    tabBarIcon: props => TabIcon({...props, name:'video'})
                    }}
            />
            <Tab.Screen 
                name="Settings" 
                component={Settings} 
                options={{
                    tabBarIcon: props => TabIcon({...props, name:'cog'})
                    }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;