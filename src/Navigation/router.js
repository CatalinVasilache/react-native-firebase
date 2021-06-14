import React from "react";
import {Text} from "react-native";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {
    LoginScreen,
    HomeScreen,
    RegistrationScreen,
    MementoScreen,
    Counter,
    LogoutScreen,
    ScoreGuess
} from '../Containers'
import {createDrawerNavigator} from '@react-navigation/drawer';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const authScreens = {
    LoginScreen: LoginScreen,
    RegistrationScreen: RegistrationScreen,
}
const commonScreens = {
    HomeScreen: HomeScreen,
    Counter: Counter,
    MementoScreen: MementoScreen,
    ScoreGuess: ScoreGuess,
    LogoutScreen: LogoutScreen
}

export default function CreateRootNavigator(props) {
    return (
        <NavigationContainer>
            {props.isLoggedIn ? (
                <Drawer.Navigator screenOptions={{
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }} initialRouteName="Home">
                    {Object.entries(commonScreens).map(([name, component], index) => (
                        <Drawer.Screen name={name} component={component} key={index} initialParams={props.user}
                                       options={{
                                           headerTitle: () => (<Text>{name}</Text>), headerShown: true
                                       }}/>
                    ))}
                </Drawer.Navigator>
            ) : (
                <Stack.Navigator screenOptions={{
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}>
                    {Object.entries(authScreens).map(([name, component], index) => (
                        <Stack.Screen name={name} component={component} key={index} options={{
                            headerTitle: () => (<Text>{name}</Text>),
                        }}/>
                    ))}
                </Stack.Navigator>
            )
            }
        </NavigationContainer>
    )
}