import React from "react";
import {Platform, StatusBar, Button, Text} from "react-native";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import Home from "../Containers/HomeScreen/HomeScreen";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LoginScreen, HomeScreen, RegistrationScreen, MementoScreen, Counter, LogoutScreen} from '../Containers'
import {TouchableOpacity} from "react-native-web";
import {useNavigation} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer';

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

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
    LogoutScreen: LogoutScreen
}

export default function CreateRootNavigator(props) {
    console.log('router: ------------', props.isLoggedIn)
    return (
        <NavigationContainer>
            {props.isLoggedIn ? (
                <Drawer.Navigator screenOptions={{
                    headerStyle: headerStyle, headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }} initialRouteName="Home">
                    {Object.entries(commonScreens).map(([name, component]) => (
                        <Drawer.Screen name={name} component={component} initialParams={props.user} options={{
                            headerTitle: () => (<Text>{name}</Text>), headerShown: true
                        }}/>
                    ))}
                </Drawer.Navigator>
            ) : (
                <Stack.Navigator screenOptions={{
                    headerStyle: headerStyle, headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}>
                    {Object.entries(authScreens).map(([name, component]) => (
                        <Stack.Screen name={name} component={component} options={{
                            headerTitle: () => (<Text>{name}</Text>),
                        }}/>
                    ))}
                </Stack.Navigator>
            )
            }
        </NavigationContainer>
    )
}