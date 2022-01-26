import React from "react";
import {Text} from "react-native";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {
    LoginScreen,
    AdminDashboard,
    CreateNews,
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
    'Admin Dashboard': AdminDashboard,
    'Counter': Counter,
    'Memento': MementoScreen,
    'Score Guess': ScoreGuess,
    'Logout': LogoutScreen
}

const adminScreens = {
    CreateNews: CreateNews,
}

export default function CreateRootNavigator(props) {
    return (
        <NavigationContainer>
            {props.isLoggedIn ? (
                <Drawer.Navigator screenOptions={{
                    headerTintColor: '#130d0d',
                    headerTitleStyle: {
                        fontWeight: 'normal',
                    }
                }} initialRouteName="Home">
                    {Object.entries(commonScreens).map(([name, component], index) => (
                        <Drawer.Screen name={name} component={component} key={index} initialParams={props.user}
                                       options={{
                                           headerTitle: () => (<Text>{name}</Text>), headerShown: true
                                       }}/>
                    ))}
                    {Object.entries(adminScreens).map(([name, component], index) => (
                        <Stack.Screen name={name} component={component} key={index} options={{
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
