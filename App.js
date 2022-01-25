import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react'
import {decode, encode} from 'base-64'
import {firebase} from './src/Firebase/config'
import {Provider} from 'react-redux';
import {store} from './src/Store/Store';
import CreateRootNavigator from "./src/Navigation/router";
import {Text} from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

if (!global.btoa) {
    global.btoa = encode
}
if (!global.atob) {
    global.atob = decode
}

export default function App() {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        (() => {
            registerForPushNotificationsAsync()
        })()
    }, [])

    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }
        if (token) {
            const res = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({token}, {merge: true});
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    useEffect(() => {
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data()
                        setLoading(false)
                        setUser(userData)
                        setIsLoggedIn(true)
                    })
                    .catch((error) => {
                        setLoading(false)
                    });
            } else {
                setUser(null)
                setIsLoggedIn(false)
                setLoading(false)
            }
        });
    }, []);

    if (loading) {
        return (
            <></>
        )
    }

    return (
        <Provider store={store}>
            {loading ? (
                <Text>Loading</Text>
            ) : (
                <CreateRootNavigator isLoggedIn={isLoggedIn} user={isLoggedIn ? user : ''}/>
            )}
        </Provider>
    );
}