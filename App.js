import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react'
import {decode, encode} from 'base-64'
import {firebase} from './src/Firebase/config'
import {Provider} from 'react-redux';
import {store} from './src/Store/Store';
import CreateRootNavigator from "./src/Navigation/router";
import {Text} from "react-native";

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