import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import List from '../screens/List';
import Item from '../screens/Item';

export type RootStackParamList = {
  Home: undefined;
  List: undefined;
  Item: { id: string; name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName='Home' 
            screenOptions={{
                cardStyle: {backgroundColor: '#fff'},
                headerStyle: {
                    height:110,
                    backgroundColor: '#95a5a6',
                },
                headerTitleStyle: {
                    color: '#fff',
                    fontSize: 24,
                },
                headerTitleAlign: 'center',
                }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="List" component={List} options={{headerTitle: "List Screen"}}/>
            <Stack.Screen name="Item" component={Item} />
        </Stack.Navigator>
    );
};

export default StackNavigator;